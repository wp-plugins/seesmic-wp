=== Seesmic ===
Contributors: Seesmic
Tags: comments, video
Requires at least: 2.1
Tested up to: 2.5
Stable tag: 0.1.3

The Seesmic plugin allows for video comments to be added to your Wordpress blog.

== Description ==

Video comments add a new dimension when readers comment in two-way, threaded communication. 

The plugin makes it easy to:

* Record one or more Seesmic video's to a post.
* Allow for replies and threaded conversation.
* Accept authenticated or anonymous video comments.
* Moderate video comments exactly like text comments. 

== Installation ==

1. Download the Seesmic plugin
2. Unzip the file to your /wp-content/plugins/ directory. If you are uploading to your plugins directory, be sure to upload the entire seesmic-wp-plugin directory (not simply the individual files).
3. Enable the plugin in your dashboard.
4. If you would like to allow people to post a video reply w/out creating a Seesmic account, visit Settings > Seesmic Comments and check Allow anonymous video comments. 

Note: In Comment Moderation options, "Hold a comment in the queue if it contains x or more links" must be set to 3 or more. 

== Frequently Asked Questions ==

= I use a custom theme, will I have any troubles? =

The default tag id `<textarea id="comment">` must be included. It should already be included in most standard themes.

= I have installed the plugin but my videos do not play = 

`<?php wp_head(); ?>` must be included in your header template in between the HEAD tags. Otherwise the JavaScript includes will not be defined correctly and you will not be able to record or play videos. 

= I have installed a custom thread comment plugin, will I have any problems? = 

In order to use threaded comments, we recommend using the wordpress thread comment plugin. Other threaded comments plugins may not work. 

== Notes ==

Information on how to use the Seesmic plugin, a screencast showing the plugin in use and other notes can be found at http://wiki.seesmic.com/Wp-plugin
