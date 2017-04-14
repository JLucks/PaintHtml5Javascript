<!DOCTYPE html>
<html lang="en">

<?php $pageName = "Canvas Paint"?>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title><?php echo $pageName?></title>

    <?php include 'resources/resources.php';?>
</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <?php include 'resources/navbar.php';?>

        <div id="page-wrapper">
        
            <?php 
                if(isset($_GET['page'])) {
                    if(is_file('pages/' . $_GET['page'] . '.php')) {
                        include 'pages/' . $_GET['page'] . '.php';
                    }
                    else{
                        echo '<br/>Página não encontrada. Que tal por uma página de NotFound legal aqui?';
                    }
                }
                else{
                    include 'pages/paint.html';
                }   

            ?>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

</body>

</html>
