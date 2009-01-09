<?php
/*
Plugin Name: Seesmic WordPress plugin
Plugin URI: http://wiki.seesmic.com/Wp-plugin
Author URI: http://blog.seesmic.com/
Description: Enables Seesmic video in WordPress.
Author: Seesmic Inc
Version: 0.1.6

Copyright (c) 2008,2009 Seesmic, Inc
License information is in the LICENSE.txt file
*/
?>
<?php

add_action('admin_menu', 'see_add_config_page');

add_action('wp_head', 'see_head_action');

add_action('admin_print_scripts', 'see_admin_print_scripts_action');

add_action('comment_form', 'see_comment_form_action');

add_filter('comment_text', 'see_comment_text_filter');

add_filter('comments_array','see_comments_array_filter');

add_filter('the_content','see_the_content_filter');

add_action('edit_form_advanced','see_edit_form_advanced_action');
?>
<?php 
function see_head_action() {
	if(get_option("see_disable_plugin")==false && get_option("see_disable_post_videos")==false) {
?>
	<!--[if lt IE 7]><style type="text/css">.seePlayOverlay {background:url(<?php echo get_option('siteurl') ?>/wp-content/plugins/seesmic-wp/images/playOverlay.gif)!important}</style><![endif]-->
	<script type="text/javascript" src="<?php echo get_option('siteurl'). '/' ?>wp-content/plugins/seesmic-wp/seesmic-wp.js"></script>
	<link href="<?php echo get_option('siteurl'). '/' ?>wp-content/plugins/seesmic-wp/seesmic-wp.css" rel="stylesheet" type="text/css" />
<?php	}} ?>
<?php 
function see_admin_print_scripts_action() {
	if(get_option("see_disable_plugin")==false) {
?>
	<!--[if lt IE 7]><style type="text/css">.seePlayOverlay {background:url(<?php echo get_option('siteurl') ?>/wp-content/plugins/seesmic-wp/images/playOverlay.gif)!important}</style><![endif]-->
	<script type="text/javascript" src="<?php echo get_option('siteurl'). '/' ?>wp-content/plugins/seesmic-wp/seesmic-wp.js"></script>
	<link href="<?php echo get_option('siteurl'). '/' ?>wp-content/plugins/seesmic-wp/seesmic-wp.css" rel="stylesheet" type="text/css" />
<?php	}} ?>
<?php 

function see_add_config_page() {
    add_options_page('Seesmic', 'Seesmic', 8, 'seesmic_comments', 'see_config_page');
}
function see_config_page() {
	if ( isset($_POST['see_update']) ) {
		update_option("see_allow_anonymous", $_POST['see_allow_anonymous']);
		update_option("see_disable_plugin", $_POST['see_disable_plugin']);
		update_option("see_disable_post_videos", $_POST['see_disable_post_videos']);
	?>
		<div id="message" class="updated fade">
			<p><strong>Option saved</strong></p>
		</div>
	<?php
	}	
?>

<div class="wrap">
	<h2>Seesmic Options</h2>
	<form method="post" action="">
		<div style="width:100%; horizontal-align:right">
			<p><input <?php echo get_option("see_allow_anonymous")?'checked=\"checked\"':'' ?>" name="see_allow_anonymous" type="checkbox" /> Allow anonymous video comments</p>
			<p><input <?php echo get_option("see_disable_plugin")?'checked=\"checked\"':'' ?>" name="see_disable_plugin" type="checkbox" /> Disable the plugin</p>
			<p><input <?php echo get_option("see_disable_post_videos")?'checked=\"checked\"':'' ?>" name="see_disable_post_videos" type="checkbox" /> Disable videos in posts</p>
			<input type="submit" name="see_update" value="Update Options &raquo;"  style="float:right;" />
			<hr style="clear:both; visibility: hidden" />
		</div>
	
	</form>
</div>
<?php }?>
<?php 
function see_the_content_filter($_text='') {
	$content="";
	if(strpos($_text,"{seesmic_video:{")) {
		$offset=0;
		do {
			if(strpos($_text,"{seesmic_video:{",$offset)) {
				$content .= substr($_text,$offset,strpos($_text,"{seesmic_video:{",$offset)-$offset);
				if(get_option("see_disable_plugin")==false && get_option("see_disable_post_videos")==false) {
					$video = see_extract_video(substr($_text,$offset));
					$content .= insertVideo($video,true);
				}
				$offset = strpos($_text,"}}}",$offset)+strlen("}}}");
				$i++;
			}
			else {
				$content .= substr($_text,$offset);
				$offset=-1;
			}
		} 
		while ($offset!=-1);
		
	}
	else {
		$content.=$_text;
	}


	return $content;


}


function insertVideo($_video,$_displayTitle=true){
	
	$videoUri = substr($_video["videoUri"],strpos($_video["videoUri"],"/video/")+7);
	$resp = "";
	
	$resp .= "<span class='see_video_holder'>";
		$resp .= "<span id='see_".$videoUri."_preview'>";
			if ($_displayTitle) 
				$resp .= "<a href='".$_video["videoUri"]."' target='_blank' class='see_link' >".$_video["title"]."</a><br />";
			$resp .= "<span class='see_video_thumb' style='background-image:url(".$_video["url_thumbnail"].")'>";
				$resp .= "<span onclick=\"see_play_video('".$videoUri."',true)\" class='seePlayOverlay'></span>";
			$resp .= "</span>";
		$resp .= "</span>";
		$resp .= "<span id='see_".$videoUri."_content' class='see_video_content'></span>";
	$resp .= "</span>";
	
	return $resp;
	
}
function see_comment_form_action($postId='') {
	if(get_option("see_disable_plugin")==false) {
?>
	<input type="submit" name="see_submit" id="see_submit" value="Submit Comment" style="display:none;" />
<?php
	$myPost = get_post($postId);
	$video = see_extract_video($myPost->post_content);
	if($video['containsVideo']) {
		$see_videouri = $video['videoUri'];
	}
	else {
		$see_videouri = "";
	}
	echo ("<input type=\"hidden\" value=\"".$see_videouri."\" id=\"see_post_videouri\" name=\"see_post_videouri\" />");
	
?>

	<input type="hidden" value="<?php echo get_option("see_allow_anonymous")?"1":"0"; ?>" id="see_allow_anonymous" name="see_allow_anonymous" />
	<input type="hidden" value="<?php echo $postId ?>" id="see_post_id" name="see_post_id" />
	<div id="see_buttons_div">
		<a onclick="see_set_comment_mode('videoRec','comment')" class="see_buttons_add">Or add a Video Comment</a>
		<div class="see_buttons_and"> with</div>
		<a href="http://www.seesmic.com" target="_blank"><img alt="Seesmic Logo" src="<?php echo get_option('siteurl'). '/' ?>wp-content/plugins/seesmic-wp/images/raccoon.png" width="130" height="41" style="cursor:pointer; cursor:hand;"/></a>
	</div>
	<div id="flashcontent" ></div>
	<a onclick="see_set_comment_mode('text','comment')" id="see_back_button">&laquo; Back to text comment</a>	
	<script type="text/javascript">commentReplyId=0; setInterval("checkCommentReplyChange()",500);</script>
<?php }} ?>
<?php

function see_edit_form_advanced_action($text='') {
	if(get_option("see_disable_plugin")==false && get_option("see_disable_post_videos")==false) {
?>


	<input type="hidden" value="<?php echo get_option('home'); ?>" id="see_wp_home" name="see_wp_home" />
	<input type="hidden" value="<?php bloginfo('name'); ?>" id="see_wp_name" name="see_wp_name" />
	

	<div id="see_buttons_div">
		<a onclick="see_set_comment_mode('videoRec','post')" class="see_buttons_add">Add a video to your post</a>
		<div class="see_buttons_and"> with</div>
		<a href="http://www.seesmic.com" target="_blank" style=" float:left"><img alt="Seesmic Logo" src="<?php echo get_option('siteurl'). '/' ?>wp-content/plugins/seesmic-wp/images/raccoon.png" width="130" height="41" onclick="see_set_comment_mode('videoRec','post')" style="cursor:pointer; cursor:hand;"/></a>
	</div>
	
	
	<div id="flashcontent"></div>
	<a onclick="see_set_comment_mode('text','post')" id="see_back_button">Cancel video</a>


<?php }} ?>
<?php

function see_extract_video($_text='') {
	$videoInfo = array();
	
	$pars = array("videoUri","title","url_thumbnail");
	$parsValues = array(); 
	$allPars = true;
	$_escapeText = str_replace( "\"","&#8221;",$_text);
	$_escapeText = str_replace( "&#8243;","&#8221;",$_escapeText);
	$_escapeText = str_replace( "&#215;","x",$_escapeText);



	foreach ($pars as $value) {
		$par = "&#8221;".$value."&#8221;:{&#8221;value&#8221;:&#8221;";
		if(strpos($_escapeText,$par) && strlen($_escapeText)>($startIndex+1) ) {
			$startIndex = strpos($_escapeText,$par)+strlen($par);
			$endIndex = strpos($_escapeText,"#8221;",$startIndex+1)-1;
			
			$parsValues[$value]= substr($_escapeText,$startIndex,$endIndex-$startIndex);
			if($parsValues[$value]==false){
				$allPars = false;
			} 
		}
		else {
			$allPars = false;
		}
	}
	if($allPars==false) {
		$videoInfo['containsVideo'] = false;
		$videoInfo['videoUri'] = "";
		$videoInfo['title'] = "";
		$videoInfo['url_thumbnail'] = "";
		$videoInfo['pre_string'] = "";
		$videoInfo['post_string'] = "";
		
	}
	else {
		$videoInfo['containsVideo'] = true;
		$videoInfo['videoUri'] = seesmic_sanitize_url($parsValues["videoUri"]);
		//$videoInfo['title'] = htmlentities(trim($parsValues["title"]), ENT_QUOTES );
		$videoInfo['title'] = $parsValues["title"];
		$videoInfo['url_thumbnail'] = seesmic_sanitize_url($parsValues["url_thumbnail"]);
		$videoInfo['pre_string'] = substr($_escapeText,0,strpos($_escapeText,"{&#8221;"));
		$videoInfo['post_string'] = substr($_escapeText,strpos($_escapeText,"&#8221;}}")+strlen("&#8221;}}"),strlen($_escapeText));
}
	return $videoInfo;
	
}
function seesmic_sanitize_url($url) {
 	# note that this will whipe an invalid url
 	$url = preg_grep("/^[A-Za-z]+:\/\/[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$/", array($url));
 	return strval($url[0]);
}
function see_comment_text_filter($_text='') {
	if(get_option("see_disable_plugin")==true)
		return $_text;
		
	$video = see_extract_video($_text);
	if($video['containsVideo']==true) 
		return insertVideo($video,true);
	
	return $_text;
}
?>
<?php
function see_comments_array_filter($_comments) {
	if(get_option("see_disable_plugin")==false && get_option("see_disable_post_videos")==true) {
?>
	<!--[if lt IE 7]><style type="text/css">.seePlayOverlay {background:url(<?php echo get_option('siteurl') ?>/wp-content/plugins/seesmic-wp/images/playOverlay.gif)!important}</style><![endif]-->
	<script type="text/javascript" src="<?php echo get_option('siteurl'). '/' ?>wp-content/plugins/seesmic-wp/seesmic-wp.js"></script>
	<link href="<?php echo get_option('siteurl'). '/' ?>wp-content/plugins/seesmic-wp/seesmic-wp.css" rel="stylesheet" type="text/css" />
<?php 
	}
	$comments_list="";
	if(get_option("see_disable_plugin")==false) {
		$comments_result = $_comments;
		foreach( $_comments as $comment ) {
			$video = see_extract_video($comment->comment_content);
			if($video['containsVideo']==true) {
				if($comments_list!="")
					$comments_list.=";";
				$comments_list.=$comment->comment_ID."=".$video['videoUri'];
			}
	 	}
	}
	else {
		$comments_result  = array_filter($_comments,"see_comments_array_filter_disabled");
	}
	echo "<input type=\"hidden\" value=\"".$comments_list."\" id=\"see_comments_list\" name=\"see_comments_list\" />";
	echo ("<input type=\"hidden\" value=\"".get_option('home')."\" id=\"see_wp_home\" name=\"see_wp_home\" />");
	echo "<input type=\"hidden\" value=\"";
	bloginfo('name');
	echo "\" id=\"see_wp_name\" name=\"see_wp_name\" />";

	return $comments_result;
}
function see_comments_array_filter_disabled($var) {
	$video = see_extract_video($var->comment_content);
	if($video['containsVideo']==true) 
	{
		return false;
	}
	return true;
}


?>