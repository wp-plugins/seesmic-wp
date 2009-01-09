//
// Seesmic WordPress plugin
// 
// Copyright (c) 2008,2009 Seesmic, Inc
// All Rights Reserved
//
// License information is in the LICENSE.txt file
// 
function see_set_comment_mode(_mode, _recState, _title ) {
	flashcontentDiv = document.getElementById("flashcontent");
	buttonsDiv = document.getElementById("see_buttons_div");
	backButton = document.getElementById("see_back_button");
	wpHome = document.getElementById("see_wp_home");
	wpName = document.getElementById("see_wp_name");

	switch(_recState)
	{
	case "comment":
		commentInput = document.getElementById("comment");
		submitButton = document.getElementById("submit");
		replyId = document.getElementById("comment_reply_ID");
		seeAllowAnonymous = document.getElementById("see_allow_anonymous");
		if (_mode=="videoRec") {

			inreplyto = "";			
			if(commentReplyId==0) {
				postVideouri = document.getElementById("see_post_videouri");
				if(postVideouri.value) {
					inreplyto=postVideouri.value;
				}
				else {
					commentsList = document.getElementById("see_comments_list");
					if(commentsList.value) {
						commentsSplit=(commentsList.value+"").split(";");
						inreplyto = commentsSplit[0].split("=")[1];
					}
				}
			}
			else {
				commentsList = document.getElementById("see_comments_list");
				commentsSplit=(commentsList.value+"").split(";");
				commentsArray = new Array();
				for (var comm in commentsSplit){
					valuesSplit=(commentsSplit[comm]+"").split("=");
					commentsArray[valuesSplit[0]]=valuesSplit[1];
				}
				if(commentsArray[commentReplyId]){
					inreplyto = commentsArray[commentReplyId];
				}
			}
			// resize flash content container
			flashcontentDiv.style.width = "300px";
	 		flashcontentDiv.style.height = "270px";
			
			// push flash widget
			var so = new SWFObject("http://seesmic.com/embeds/wrapper.swf?v=" + Math.floor(Math.random()*10000001), "sobject", "300", "270", "9", "#000000");
			so.addVariable("version","wprecorder");
			so.addVariable("title", _title);
			so.addVariable("recState", _recState);
			so.addVariable("inreplyto", inreplyto);
			so.addVariable("blog_id", wpHome.value);
			so.addVariable("allowAnonymous", seeAllowAnonymous.value);
			so.addVariable("blog_name", wpName.value);
			so.addParam("allowScriptAccess","always");
			so.useExpressInstall('swfobject/expressinstall.swf');
			so.write("flashcontent");

	 		if (document.getElementById("comment")) {
 				document.getElementById("comment").style.display = 'none';
			}
	
			if (document.getElementById("submit")) {
 				document.getElementById("submit").style.display = 'none';
			}
	 		
			if (document.getElementById("see_buttons_div")) {
 				document.getElementById("see_buttons_div").style.display = 'none';
			}

			if (document.getElementById("see_back_button")) {
 				document.getElementById("see_back_button").style.display = 'block';
			}


			
		}
		else {
			// remove widget
	 		if (document.getElementById("flashcontent")) {
		 		document.getElementById("flashcontent").innerHTML = "";
				document.getElementById("flashcontent").style.width = "10px";
		 		document.getElementById("flashcontent").style.height = "10px";
	 		}
	 		
	 		if (document.getElementById("comment")) {
 				document.getElementById("comment").style.display = 'block';
			}
	
			if (document.getElementById("submit")) {
 				document.getElementById("submit").style.display = 'block';
			}
	 		
			if (document.getElementById("see_buttons_div")) {
 				document.getElementById("see_buttons_div").style.display = 'block';
			}

			if (document.getElementById("see_back_button")) {
 				document.getElementById("see_back_button").style.display = 'none';
			}
		}
	  break;    

	  case "post":
		postTitleInput = document.getElementById("title");

		if (_mode=="videoRec") {

			// resize flash content container
			flashcontentDiv.style.width = "300px";
	 		flashcontentDiv.style.height = "270px";
			
			// push flash widget
			var so = new SWFObject("http://seesmic.com/embeds/wrapper.swf?v=" + Math.floor(Math.random()*10000001), "sobject", "300", "270", "9", "#000000");
			so.addVariable("version","wprecorder");
			so.addVariable("title", _title);
			so.addVariable("recState", _recState);
			so.addVariable("blog_id", wpHome.value);
			so.addVariable("blog_name", wpName.value);
			so.addVariable("title", postTitleInput.value);
			so.addParam("allowScriptAccess","always");
			so.useExpressInstall('swfobject/expressinstall.swf');
			so.write("flashcontent");
			
			if (document.getElementById("see_buttons_div")) {
 				document.getElementById("see_buttons_div").style.display = 'none';
			}

			if (document.getElementById("see_back_button")) {
 				document.getElementById("see_back_button").style.display = 'block';
			}
			
		}
		else {
			// remove widget
	 		if (document.getElementById("flashcontent")) {
		 		document.getElementById("flashcontent").innerHTML = "";
				document.getElementById("flashcontent").style.width = "10px";
		 		document.getElementById("flashcontent").style.height = "10px";
	 		}
	 		
			if (document.getElementById("see_buttons_div")) {
 				document.getElementById("see_buttons_div").style.display = 'block';
			}

			if (document.getElementById("see_back_button")) {
 				document.getElementById("see_back_button").style.display = 'none';
			}
			
		}
	  
	  
	  break;
	default:
	}

}


function see_play_video(_videoUri, _add) {

	flashcontentDiv = document.getElementById("see_" + _videoUri + "_content");
	previewDiv = document.getElementById("see_" + _videoUri + "_preview");
	if(_add) {
		// push flash widget
		var so = new SWFObject("http://seesmic.com/embeds/wrapper.swf?v=" + Math.floor(Math.random()*10000001), "sotester", "300", "270", "9", "#000000");
		so.addVariable("video", _videoUri);
		so.addVariable("version","wpplayer");
		so.addParam("allowFullScreen", "true");
		so.addParam("allowScriptAccess","always");
		so.useExpressInstall('swfobject/expressinstall.swf');
		so.write("see_" + _videoUri + "_content");

		previewDiv.style.display="none";

	}
	else {
		setTimeout("flashcontentDiv.innerHTML=''; previewDiv.style.display='block';", 500);
	}

}
function videoFromRecorder(videoUri, title, url_thumbnail, recState)
{
	if(recState=="comment") {
		commentInput = document.getElementById("comment");
		submitButton = document.getElementById("see_submit");
		//submitForm = document.forms.commentform;
			
		newVideo = title + ' ';
		newVideo += '{seesmic_video:{';
			newVideo += '"url_thumbnail":{"value":"' + url_thumbnail + '"}';
			newVideo += '"title":{"value":"'+title+'&nbsp;"}';
			newVideo += '"videoUri":{"value":"' + videoUri + '"}';
		newVideo += '}}';
	
		commentInput.value = newVideo;
		submitButton.click();
		//submitForm.submit.click();
		
		
	}

	if(recState=="post") {
		newVideo = '{seesmic_video:{';
			newVideo += '"url_thumbnail":{"value":"' + url_thumbnail + '"}';
			newVideo += '"title":{"value":"'+title+'&nbsp;"}';
			newVideo += '"videoUri":{"value":"' + videoUri + '"}';
		newVideo += '}}';
		
		if (document.getElementById("edButtonHTML")) {
			if(document.getElementById("edButtonHTML").tagName=="INPUT") {
				document.getElementById("edButtonHTML").click();
			}
			else {
				if(document.getElementById("edButtonHTML").onclick!=undefined) {
					document.getElementById("edButtonHTML").onclick();
				}
			}
		}
		
		if (document.getElementById("content")) {
			setTimeout("document.getElementById('content').value += ' '+newVideo+' '", 1000);
		}

		setTimeout("see_set_comment_mode('text','post')", 1500);
				
	}

	
	
	
	return 'posted'
}
function checkCommentReplyChange() {
	replyIdInput = document.getElementById("comment_reply_ID");
	if(replyIdInput) {
		if(replyIdInput.value!=commentReplyId) {
			commentReplyId=replyIdInput.value;
			see_set_comment_mode('text','comment');
		}
	}
}




//
//  COOKIE
//

function setCookieStrig (cookie_string) {
	document.cookie = cookie_string;
}

// SET COOKIE
function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{
  var cookie_string = name + "=" + escape ( value );

  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }

  if ( path )
        cookie_string += "; path=" + escape ( path );

  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}


// GET COOKIE
function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( cookie_name + '=(.*?)(;|$)' );

  if ( results )
    return ( unescape ( results[1] ) );
  else
    return null;
}


// DELETE COOKIE
function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  // current date & time
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}








//
//  SWFOBJECT
//

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;