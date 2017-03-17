<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="../grid_css/grid2.css">
    <link rel="stylesheet" href="style.css">
<!--    <script src="https://use.fontawesome.com/d221e5e5b6.js"></script>-->
    <script data-init="application/controller.js" src="../namespaceapplication/build/namespaceapplication.js"></script>
</head>
<body>

<div class="table header">

    <div>WorkTasks</div>
    <div>
        <form name="task" class="table text-right">
            <input name="task_name" type="text" class="width-50" required="required">
            <div class="button" data-action="add"><i class="fa fa-plus"></i> Add task</div>
        </form>
    </div>

</div>

<div id="tasks"></div>

<template>
    <div data-template="task" class="table task" data-taskindex="{taskindex}">
        <div>{taskname}</div>
        <div class="width-5">{taskupdate}</div>
        <div class="width-10 text-right">
            {taskactions}
        </div>
    </div>
</template>

</body>
</html>