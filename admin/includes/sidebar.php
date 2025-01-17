<?php

	$postTypes = $mysqli->query("SELECT * FROM `post_types`");
	$postItems = [];
	$pi = 0;

	if($postTypes->num_rows > 0) {
		while($postType = $postTypes->fetch_assoc()) {
            if(checkaccess('posttype_' . $postType['name'], true) !== false) {
                $postItems[$pi] = [
                    'name' => ucwords(str_replace('-', ' ', $postType['name'])),
                    'link' => 'admin/manage-content/' . $postType['name'],
                    'icon' => (!empty($postType['icon']) ? $postType['icon'] : 'fa-file-alt')
                ];

                $pi++;
            }
		}
		
		array_splice($adminMenu, 1, 0, $postItems);
	}

    //Insert blank target to any item that is missing it
    foreach($adminMenu as $index => $item) {
        if(is_array($adminMenu[$index]) && !array_key_exists('target', $adminMenu[$index])) {
            $adminMenu[$index]['target'] = '';
        }
    }
?>

<a id="toggleSidebar" class="floatingToggle btn-dark"><span class="fa fa-bars"></span></a>

<ul class="nav flex-column">
	<li class="nav-item">
		<a id="toggleSidebar" class="nav-link btn-dark">
			<span>Toggle Menu</span>
			<span class="fa fa-bars"></span>
		</a>
	</li>
	
	<?php foreach($adminMenu as $item) : ?>
        <?php if((!empty($item['filename']) && checkaccess($item['filename'], true) !== false) || empty($item['filename'])) : ?>
            <?php    
                if($item['target'] == 'popup') {
                    $width = (isset($item['popup_width']) && is_numeric($item['popup_width']) ? $item['popup_width'] : 1000);
                    $height = (isset($item['popup_height']) && is_numeric($item['popup_height']) ? $item['popup_height'] : 625);

                    $hw = ',\'width=' . $width . ',height=' . $height . '\'';

                    $target = 'target="popup" onclick="window.open(\'' . $item['link'] . '\', \'' . $item['name'] . '\'' . $hw . '); return false;"';
                }
                elseif(!empty($item['target'])) {
                    $target = 'target="' . $item['target'] . '"';
                }
                else {
                    $target = '';
                }
            ?>

            <li class="nav-item shadow-sm">
                <a class="nav-link btn-dark" href="<?php echo $item['link']; ?>" <?php echo $target; ?>>
                    <span><?php echo $item['name']; ?></span>
                    <?php echo (!empty($item['icon']) ? '<span class="' . $item['icon'] . '"></span>' : ''); ?>
                </a>
            </li>
        <?php endif; ?>
	<?php endforeach; ?>
	
	<li class="nav-item">
		<a class="nav-link btn-dark" data-fancybox="mediamanager" data-type="iframe" data-src="js/responsive_filemanager/filemanager/dialog.php" href="javascript:;">
			<span>Media Manager</span>
			<span class="fa fa-photo-video"></span>
		</a>
	</li>
</ul>

<footer id="pageFooter">
    <span class="small"><a href="https://github.com/Setsquare-Solutions/Setsquare-CMS" target="_blank"><span class="fab fa-github"></span> Setsquare-Solutions/Setsquare-CMS</a> <?php echo CMS_VERSION; ?></span>
</footer>