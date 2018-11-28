<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:69:"themes/admin_simpleboot3/protocol/admin_category/select_user_one.html";i:1543371460;s:77:"/var/www/sign_online/admin/public/themes/admin_simpleboot3/public/header.html";i:1540625985;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- HTML5 shim for IE8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <![endif]-->


    <link href="/sign_online/admin/public/themes/admin_simpleboot3/public/assets/themes/<?php echo cmf_get_admin_style(); ?>/bootstrap.min.css" rel="stylesheet">
    <link href="/sign_online/admin/public/themes/admin_simpleboot3/public/assets/simpleboot3/css/simplebootadmin.css" rel="stylesheet">
    <link href="/sign_online/admin/public/static/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!--[if lt IE 9]>
    <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
        form .input-order {
            margin-bottom: 0px;
            padding: 0 2px;
            width: 42px;
            font-size: 12px;
        }

        form .input-order:focus {
            outline: none;
        }

        .table-actions {
            margin-top: 5px;
            margin-bottom: 5px;
            padding: 0px;
        }

        .table-list {
            margin-bottom: 0px;
        }

        .form-required {
            color: red;
        }
    </style>
    <script type="text/javascript">
        //全局变量
        var GV = {
            ROOT: "/sign_online/admin/public/",
            WEB_ROOT: "/sign_online/admin/public/",
            JS_ROOT: "static/js/",
            APP: '<?php echo \think\Request::instance()->module(); ?>'/*当前应用名*/
        };
    </script>
    <script src="/sign_online/admin/public/themes/admin_simpleboot3/public/assets/js/jquery-1.10.2.min.js"></script>
    <script src="/sign_online/admin/public/static/js/wind.js"></script>
    <script src="/sign_online/admin/public/themes/admin_simpleboot3/public/assets/js/bootstrap.min.js"></script>
    <script>
        Wind.css('artDialog');
        Wind.css('layer');
        $(function () {
            $("[data-toggle='tooltip']").tooltip({
                container:'body',
                html:true,
            });
            $("li.dropdown").hover(function () {
                $(this).addClass("open");
            }, function () {
                $(this).removeClass("open");
            });
        });
    </script>
    <?php if(APP_DEBUG): ?>
        <style>
            #think_page_trace_open {
                z-index: 9999;
            }
        </style>
    <?php endif; ?>
</head>
<body>
<div class="wrap js-check-wrap">
    <form method="post" class="js-ajax-form" action="<?php echo url('AdminCategory/listorders'); ?>">
        <table class="table table-hover table-bordered table-list" id="menus-table-one">
            <thead>
            <tr>
                <th width="16">
                    <label>
                        <input type="checkbox" class="js-check-all" data-direction="x" data-checklist="js-check-x">
                    </label>
                </th>
                <th width="50">ID</th>
                <th>负责人</th>
            </tr>
            </thead>
            <tbody>
                <?php echo $categories_tree; ?>
           
           
            </tbody>
        </table>
    </form>
</div>
<script src="/sign_online/admin/public/static/js/admin.js"></script>
<script>

    $(document).ready(function () {
        Wind.css('treeTable');
        Wind.use('treeTable', function () {
            $("#menus-table-one").treeTable({
                indent: 20,
                initialState: 'expanded'
            });
        });
    });

    $('.data-item-tr').click(function (e) {

        console.log(e);
        var $this = $(this);
        if ($(e.target).is('input')) {
            return;
        }

        var $input = $this.find('input');
        if ($input.is(':checked')) {
            $input.prop('checked', false);
        } else {
            $input.prop('checked', true);
        }
    });

    function confirm() {
        var selectedCategoriesId   = [];
        var selectedCategoriesName = [];
        var selectedCategories     = [];
        var selectedCategoriesPlace= [];
        $('.js-check:checked').each(function () {
            var $this = $(this);
            selectedCategoriesId.push($this.val());
            selectedCategoriesName.push($this.data('name'));

            selectedCategories.push({
                id: $this.val(),
                name: $this.data('name')
            });

            var place_val = $this.closest('tr').find('select').val();
            // console.log($this.closest('tr'));
            // console.log(place_val);
            selectedCategoriesPlace.push(place_val);
        });

        return {
            selectedCategories: selectedCategories,
            selectedCategoriesId: selectedCategoriesId,
            selectedCategoriesName: selectedCategoriesName,
            selectedCategoriesPlace: selectedCategoriesPlace
        };
    }
</script>
</body>
</html>