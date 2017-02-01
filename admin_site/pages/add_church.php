<?php
//Buffer larger content areas like the main page content
ob_start();
session_start();
?>
    <div style="text-align: center; width: 100%;" >
        <label style="font-size: 14px">Add Church</label>
    </div><br /><br/>

    <form action="../scripts/ChurchesScript.php?action=create" method="post" enctype="multipart/form-data">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%">
            <input class="mdl-textfield__input" type="text" id="name" name="name">
            <label class="mdl-textfield__label" for="name">Church Name</label>
        </div>

        <!--<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="surname" name="surname">
            <label class="mdl-textfield__label" for="surname">Last Name</label>
        </div>-->

        <!--<div class="mdl-select mdl-js-select mdl-select--floating-label">
            <select class="mdl-select__input" id="leader" name="leader">
                <option value=""></option>
                <option value="option1">option 1</option>
                <option value="option2">option 2</option>
                <option value="option3">option 3</option>
                <option value="option4">option 4</option>
                <option value="option5">option 5</option>
            </select>
            <label class="mdl-select__label" for="leader">Leading Member</label>
        </div>-->

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="address" name="address">
            <label class="mdl-textfield__label" for="address">Address</label>
        </div>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="description" name="description">
            <label class="mdl-textfield__label" for="description">Description</label>
        </div><br />

        <div class="mdl-textfield" style="padding-left: 30px">
            Select file to upload:
            <input type="file" name="fileToUpload" id="fileToUpload">
        </div>

        <!--<div class="row fileupload-buttonbar">
            <div class="col-lg-7">
                <!-- The fileinput-button span is used to style the file input field as button -->
                <!--<button class="btn btn-success fileinput-button">
                    <i class="glyphicon glyphicon-plus"></i>
                    <span>Add files...</span>
                    <input type="file" name="files[]" multiple>
                </button>
                <button type="submit" class="btn btn-primary start">
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>Start upload</span>
                </button>
                <button type="reset" class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel upload</span>
                </button>
                <button type="button" class="btn btn-danger delete">
                    <i class="glyphicon glyphicon-trash"></i>
                    <span>Delete</span>
                </button>
                <input type="checkbox" class="toggle">
                <!-- The global file processing state -->
                <!--<span class="fileupload-process"></span>
            </div>
            <!-- The global progress state -->
            <!--<div class="col-lg-5 fileupload-progress fade">-->
                <!-- The global progress bar -->
                <!--<div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-success" style="width:0%;"></div>
                </div>-->
                <!-- The extended global progress state -->
                <!--<div class="progress-extended">&nbsp;</div>
            </div>
        </div>-->
        <!-- The table listing the files available for upload/download -->
        <!--<table role="presentation" class="table table-striped"><tbody class="files"></tbody></table>-->

        <div style="text-align: center; width: 100%;" >
            <input type="hidden" id="churchId" name="churchId" />
            <input type="submit" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" value="Save">
            </input>
            <input type="reset" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" value="Cancel">
            </input>
        </div>
    </form>
    <script id="template-upload" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-upload fade">
        <td>
            <span class="preview"></span>
        </td>
        <td>
            <p class="name">{%=file.name%}</p>
            <strong class="error text-danger"></strong>
        </td>
        <td>
            <p class="size">Processing...</p>
            <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
        </td>
        <td>
            {% if (!i && !o.options.autoUpload) { %}
                <button class="btn btn-primary start" disabled>
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>Start</span>
                </button>
            {% } %}
            {% if (!i) { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel</span>
                </button>
            {% } %}
        </td>
    </tr>
{% } %}
</script>
    <!-- The template to display files available for download -->
    <script id="template-download" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-download fade">
        <td>
            <span class="preview">
                {% if (file.thumbnailUrl) { %}
                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>
                {% } %}
            </span>
        </td>
        <td>
            <p class="name">
                {% if (file.url) { %}
                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?'data-gallery':''%}>{%=file.name%}</a>
                {% } else { %}
                    <span>{%=file.name%}</span>
                {% } %}
            </p>
            {% if (file.error) { %}
                <div><span class="label label-danger">Error</span> {%=file.error%}</div>
            {% } %}
        </td>
        <td>
            <span class="size">{%=o.formatFileSize(file.size)%}</span>
        </td>
        <td>
            {% if (file.deleteUrl) { %}
                <button class="btn btn-danger delete" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields='{"withCredentials":true}'{% } %}>
                    <i class="glyphicon glyphicon-trash"></i>
                    <span>Delete</span>
                </button>
                <input type="checkbox" name="delete" value="1" class="toggle">
            {% } else { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel</span>
                </button>
            {% } %}
        </td>
    </tr>
{% } %}
</script>
<?php
//Assign all Page Specific variables
$mainContent = ob_get_contents();
ob_end_clean();
$pagetitle = "Add Church Page";
$pageName = "Churches";
//Apply the template
include("page_master.php");
?>