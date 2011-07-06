<?php /*%%SmartyHeaderCode:%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8a5eda89a383126dc03b99dadfb9dd222f8331e8' => 
    array (
      0 => 'libs/smarty/templates/index_view.php',
      1 => 1307483589,
      2 => 'php',
    ),
  ),
  'nocache_hash' => '',
  'has_nocache_code' => false,
  'cache_lifetime' => 100,
)); /*/%%SmartyHeaderCode%%*/?>
<?php if (!$no_render) {?>PHP file test
$foo is 'bar'<br> Test functions
bar<br>Test objects
Hello my name is Paul and I am 39 years old.<br>Test Arrays
This is a long string 2<br>function time 
1307483987<br>nocache function time 
<?php echo '<?'; ?> echo time();<?php echo '?>'; ?><br>DONE
<?php } ?>