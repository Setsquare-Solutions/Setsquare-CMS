# Setsquare-CMS

It is recommended that you run at least PHP7.1 and ideally PHP7.4, there may be some incompatibilities with PHP8.0 but I have fixed everything that I have found so far.

**Jump to:**
* [Setup](#setup)
* [Bootstrap](#bootstrap)
* [General Usage](#general-usage)
* [Pages / News](#pages--news)
* [Comments](#comments)
* [Forms](#forms)
* [Navigation](#navigation)
* [Users](#users)
* [Settings](#settings)
* [Profile](#profile)
* [Media Manager](#media-manager)
* [Templates](#templates)
* [Plugins](#plugins)
* [Shortcodes](#shortcodes)
* [User Accounts](#front-end-user-functionality)
* [Credits](#credits)

## Setup

Installation is as simple as downloading a copy of the repository and saving the files to the required directory.

First make sure that the .htaccess file has the correct RewriteBase location, if you are installing to a directory other than the document root. 

Then you will want to ensure that the file permissions are correct, this will most likely vary depending on your server configuration but 775/755 for directories and 664/644 for files should work best. In order for the setup process to be successful the includes directory must be writable by the server, so that a new settings.php file can be created. 

> 775 and 664 permissions are best for none PHP-FPM installations, combined with the web user owning the directory (www-data, httpd, apache)

> 755 and 644 permissions are best for FPM installations where the cms will be installed to a users home directory, owned by that user

Next you will want to create a new MySQL database and go to **https://yoursite.com**. You should be redirected automatically to the setup page. On this page fill out your MySQL database details, and then an email and password for your initial admin account. After submitting you should see a message explaining that installation is complete and you can now login to your admin account. You should also receive an email confirming this.

You can click the link on the confirmation message or in the email to get to the admin login, or go to **https://yoursite.com/admin-login/**. The initial account always has the username **admin**.

### Bootstrap

Bootstrap 5.0.2 is now being included by default, although it's inclusion is only required for the purposes of modifying the main css files through scss. If you do not wish to do this and want to free up some space then feel free to delete the node modules directory. You can re-install Bootstrap at any time by using:

> npm install bootstrap@5.0.2

## General Usage

After logging in to the cms you will be presented with a dashboard page which will welcome the logged in user, and display the latest five edits for each post type.

### Pages / News

Pages and News both follow a very similar layout as they are both post types. You can create custom post types by adding new entries to the **post_types** table within the database. Post types should be entered in all lowercase with hyphens instead of spaces. 

Pages will be given the url structure **https://yoursite.com/page-url**, whereas news and all other custom post types follow the structure **https://yoursite.com/post-type/post-url**

Going to Pages or News you will be presented with a list view of the content type. On the left is a create new content button and below that is a search bar. As you create content each item will appear within a table on the right side. 10 items will be displayed per page, in the order of most recently edited first. Next to each item is an edit or delete button.

Creating or editing a content item will take you to the single view for that item. Within this page are various fields to fill out. 
* Name - used for reference in the CMS and will be used as the Meta title if one isn't provided
* URL - the url for the page, this must be unique even amongst other post types
* Template - the template file used to display this item's content [See templates](#Templates)
* Author - mostly used for news or similar custom post types, the author will display on the page. Also used as meta author if one isn't provided
* Date Created - again mostly for news, this date will appear on news posts as the published date
* Visibility - hidden will not appear, draft can be accessed as long as you are logged in to the cms, visible is visible to everyone
* Meta - the various meta tags which are used for search engines
* Featured image - Select an image from the media manager, currently used for news to be displayed on the list view, but can be integrated into custom templates to be display wherever you want
* Excerpt - this is another field mostly used for news, the excerpt will appear on the list view of the news post type
* Content - a TinyMCE 5 editor for creating the content for the item

### Comments

When a comment is posted on any post that allowa them it will appear here. You are able to search for comments by: id, content, author.

You are able to modify the content of the comment by typing into it's textarea and clicking the modify button. This will then be reflected on the front end along with a note that an administrative user has modified the comment. This is mostly usefuly for censoring inappropriate comments. 

The original comment will be stored and can be recovered by deleting the whole content of the comment and clicking modify. 

Along with the comment will be the authors name, either a name typed out themselves if they are a guest user, or the name tied to their profile if they are registered. An IP address will be shown if one can be obtained, this can be useful for blocking malicious users or bots spamming the comment forms. If the comment is a reply, then the ID of the parent comment will be displayed, this can be clicked to view that parent comment. The date and time the comment was originally displayed is also shown.

Next to the comment details are the controls to modify or delete a comment. You are able to change the approval of a comment by checking or unchecking the "Approved" box and clicking modify. Unapproved comments will be highlighted in red and will no longer appear on the front end, this will also hide any replies. 

You can choose whether or not comments are allowed on a given post via a checkbox no the lefthand side. The comments form will not be displayed if comments are not allowed, and no comments currently exist for that post. Otherwise existing comments will be displayed, but the form to post new comments will not be loaded and a message explaining that comments are now disabled is displayed. 

Within settings is an option to choose whether new comments are approved when posted or not. This is set to unapproved by default. You are also able to add Google Recaptcha v2 credentials to verify comments before they are posted, to prevent against bots.

### Forms

You can create forms that can be displayed within a page by copying the displayed shortcode into the TinyMCE editor. In the form editor you can set a name for the form which is used for your reference only, with the exception of a contact form script that has already been provided. 

On the right hand side is the form structure. The Form ID will be automatically generated, you can create a custom php script and link the form to it actions are already located in **includes/actions/script.php** but you can put your scripts wherever you want. You can then select if you want the form to be POST or GET.

Click the + Group button to create a group of inputs. Each group will be displayed as a collapsable section with a header. If only one group exists within a form then the collapse functionality is ommitted. If only a single group exists and no group name is provided then the header section will also be ommitted entirely.

After creating a group and giving it a name you can expand it and start adding inputs. Select an input type from the dropdown and click the + Input button. You can expand each input you create and set various options for that input.

#### Contact Forms

By default an action has already been provided to use the form as a contact form **includes/actions/formsubmit.php** ensure you are using POST. Contact forms also work with Google Recaptcha v3 Invisible site and secret keys which can be entered in Settings. If one or both is not provided then the form will not attempt to use the captcha. The script will send emails to the email address also stored within Settings.

### Navigation

On the left side you will be able to select which navigation menu you want to amend, new menus can be created by adding new rows to the **naviagation_menus** table in the database. You will then need to display the menu somewhere, two classes are provided **new navbar($menuid)** and **new verticalnav($menuid)** or you can create your own.

Also on the left you can insert new items into the menu, either select an existing content item from the dropdown menu to autofill the fields, or enter the information yourself. After clicking insert the item will be added to the end of the structure.

You can edit each item within the structure to change the name, url and visiblity of the item. After making your changes close the pop-up window and click Save Navigation Structure. You are also able to re-order the menu by dragging and dropping the items, again saving the structure when finished.

### Users

In this section you can create new users who can log into the cms, or update existing ones. Each user's email address must be unique.

You are also able to create and assign roles to users. The first user is always an Admin role, which has access to everything within the CMS, this cannot be changed. By default there is also a Standard role which will have access to everything other than this users page.

The standard user's access can be amended by clicking the edit button next to the role on the left side. You will be presented with a popup to select which sections you want the role to have access to. This is a multi select box, so you can use CTRL/CMD + A to select all, click and drag to select multiple, CTRL/CMD + click to select or deselect multiple individual items. 

Managing content is broken down to individual post types, like pages and news. If you choose to create more custom post types by adding to the table in the database then make sure to allow access to these types for the standard role, if you want it to have access. 

Ideally the standard user would automatically be given access to any newly created sections within the CMS. But as the new types can only be added directly through the database this is not currently possible. The ability to create new post types through the cms may come later, this has been ommitted for now to avoid inexperienced users from accidentally creating unnecessary content.

You are also able to create as many custom roles as you like to limit page access any way you like. Custom roles behave exactly the same as the Standard role, with the addition of being able to delete them. If you delete a role, any user set to that role will be converted to the Standard role.

### Settings

Website details contains all of the information that you might want to display about your company or site. The name of the website, address and contact details. Note that the email address here is also used for contact forms if using the provided **includes/actions/formsubmit.php** script. These details generally appear within the footer, and possibly the header too.

Page settings lets you choose your homepage, and which page to display news posts. If no homepage is set then the first page in the posts table in the database will be used as the homepage. If no news page is set then news posts simply won't be displayed anywhere.

Mail settings allows you to customise how system emails are sent. System emails include account creation notifications, password reset links etc. You are able to set the email address that the emails are sent out from as well as the friendly name which appears as the sender. You are also able to set a reply to address to receive replies if you wish to do so. Finally you are able to set SMTP details if you wish to use a service such as Amazon SES.

Social media lets you link to various social media profiles, these will appear within the footer. You can create custom profiles by adding to the socail_links table within the database. The names should be stored as lower case with hyphens instead of spaces. Font awesome is used to display the logo, so make sure that they have an icon available before creating new social media accounts, the name set in the database should match what Font Awesome uses without the fa- prefix.

Other settings allows you to choose whether or not visitors can register for an account, and whether or not they can sign in to their accounts. You can also fill in Google ReCaptcha credentials here to protect forms from bots. ReCaptcha v3 is currently used to protect contact forms, while v2 is used to protect comments. Though custom functionality can be built to add recaptcha wherever you like.

### Profile

This page allows users to update their own user details: name, email, username, password. Users cannot change their own role, this must be done by an admin or role which has access to Manage Users.

### Media Manager

To handle file management Setsquare CMS uses [Responsive Filemanager](https://github.com/trippo/ResponsiveFilemanager). You are able to upload files, rename, delete and organsise using folders. Responsive filemanager is also used when inserting media into Tiny MCE or selecting images such as featured images and the site logo.

The latest full release 9.14.0 is not compatible with PHP8.0, I have made some modifications which allow it to work correctly. Enough testing has taken place that I am confident this modified version works fully as intended. As such I have removed the original copy of Responsive Filemanager.

If you wish to use the unmodified 9.14.0 version, or if a newer PHP 8.0 compatible version has been released, then download it from the [Responsive Filemanager Github](https://github.com/trippo/ResponsiveFilemanager) and copy the files into the js directory replacing the current **responsive_filemanager** directory.

## Templates

Content is displayed by default using the page.php file in the root directory. However you can create your own files within **includes/templates/** to display content however you like, look at page.php for reference. After saving your template file you can select it from the Template dropdown menu within each content item's single view.

## Plugins

You can create plugins by adding a new directory within the **includes/plugins/** directory. Give the directory a unique name and then create a plugin file within it. The plugin file should be named following the structure **my-plugin-name.plugin.php**. 

The plugin file will contain the bulk of the code used for your plugin. Although you could instead require additional files from within the directory to make things easier to manage and keep track of. 

You can use the function **add_admin_navigation($items, $offset, $length = 0)** to insert a link into the admin sidebar navigation. The first parameter will be an array of items to add to the menu, the second will be the position within the menu you wish to insert after, and the final parameter determines how many items will be added from the item array. This final parameter can generally be omitted.

Each item within the items array will be an array itself. This array accepts several parameters:
* name - The text displayed in the menu item
* link - The href used for the link, when linking to an internal page this should be combined with
* filename - The filename of the item, used to check that the user has access to it. If they do not then the link will be omitted. This can be ignored for external links.
* icon - An icon code taken from [fontawesome.com](https://fontawsome.com) e.g. 'fa-page'
* target - An optional parameter which can be set to "popup" or "_blank". "popup" will open the page in a new window, when using "popup" combine with 
* popup_width - The width for the new window
* popup_height - The height for the new window

`$items = [
    [
        'name' => 'Manage Content',
        'link' => 'admin/manage-content',
        'filename' => 'manage-content.php',
        'icon' => 'fa-page'
    ],
    [
        'name' => 'Comments',
        'link' => 'admin/manage-comments',
        'filename' => 'manage-comments.php',
        'icon' => 'fa-comment'
    ],
];

add_admin_navigation($items, 4);`

## Shortcodes

Shortcodes are PHP functions which can be inserted into pages through Tiny MCE. Shortcodes are stored within **includes/shortcodes.php** although you can create whatever files you like as long as they are included before the page header.

Shortcodes follow the format `[function_name parameter1="value" parameter2="value2"]`

Your function should accept an array of parameters rather than each parameter separated by a comma, for example.

`function function_name($parameters = []) {
    if(isset($parameters['parameter1'])) {
        return $parameters['parameter1'];
    }
}`

Function names should consist of letters, numbers, hyphens and underscores only. This is also tru for parameter names. Parameter values can be almost anything you like that can be stored as a sting within the two double quotes. 

Note: You should be able to pass double quotes as a parameter value, but make sure you escape them with a backslash `\"`.

## Front End User Functionality

### Subscriber Accounts

As well as being created through the Manage Users section of the admin, website visitors can sign up as a "Subscriber" to the website. Subscriber level users have access to a profile page where they can manage their details, as well as delete or modify any comments they have made.

When a user registers for their own account instead of being set up through the CMS, a verification email will be sent out to the supplied email address. This email contains a link which must be clicked to confirm that the email address exists before they are allowed to access their account. This is to ensure that they can recieve any required communications such as password reset links. As well as to protect against the creation of bot accounts.

Custom functionality can be built around these subscriber accounts to allow signed in users to access things such as downloadable resources or other functionality which may not be available to none registered users.

The following urls can be used to allow users to sign up:

* https://yoursite.com/signup - Allows users to register an account
* https://yoursite.com/signin - Allows registered users to sign in
* https://yoursite.com/signin?forgottenpassowrd - Allows registered users to reset their passwords, only works for subscriber accounts
* https://yoursite.com/myaccount - Allows users to manage their account

Sessions are used to check whether a user is signed in or not, the following sessions are set:

* `$_SESSION['profileid']` - The auto-increment ID that has been assigned to the user
* `$_SESSION['profileuser']` - The username chosen by the user at sign up

### Admin Accounts

Administrative users (Admin, Standard, Custom roles etc) are able to login via the **https://yoursite.com/signin** along with the regular admin-login link, they can then access the CMS as if they had logged in at the primary **admin-login** link. They can also manage their details and comments at **https://yoursite.com/myaccount**.

Sessions are also used to check the signed in status of an admin user:

* `$_SESSION['profileid']` - The auto-increment ID that has been assigned to the user
* `$_SESSION['profileuser']` - The username given to the user by an admin
* `$_SESSION['adminid']` - Identical to profileid, but must be set in order to access the CMS
* `$_SESSION['adminuser']` - Identical to profileuser, but must be set in order to access the CMS

## Credits

* [Bootstrap](https://github.com/twbs/bootstrap)
* [Responsive Filemanger](https://github.com/trippo/ResponsiveFilemanager)
* [Tiny MCE](https://www.tiny.cloud/)
* [Font Awesome](https://fontawesome.com/)
* [Fancybox](https://fancyapps.com/docs/ui/fancybox/)
* [Retina JS](https://imulus.github.io/retinajs/)
* [Admin Login Background Image](https://pixabay.com/photos/clover-shamrocks-happiness-nature-773946/) by [reichdernatur](https://pixabay.com/users/reichdernatur-173351/)
* [Clover Logo](https://www.flaticon.com/free-icon/clover_1488723?term=clover&page=1&position=6&page=1&position=6&related_id=1488723&origin=search) by [Freepik](https://www.freepik.com)
* [CSS Colors](https://gist.github.com/bobspace/2712980)
