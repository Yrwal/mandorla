# mandorla
Inline Source Editor. 

Simple edit in place components that save right back to your source file!

1. Write your html/js/css website as a static site. 
2. Add in some editable content areas and you can edit content inline.
3. Changes are saved back to the html file. No need data files or databases.
   
  Warning! You want to make changes on a staging server only and then publish files live.

#Code
Written in .NET/C#/jQuery.

Wrap your content in an editable class with a unique id
```
  <div id="demo-1" class="editable">
    <p>Initial content that is editable</p>
  </div>
```

Add a hidden field to your page
```
  <form>
    <input type="hidden" name="hiddenField">
  </form>
```

Add your javascript files to the page
```
  <script src="js/jquery-1.12.min.js"></script>
  <script src="js/tinymce/tinymce.min.js"></script>
  <script src="js/tinymce/jquery.tinymce.min.js"></script>
  <script src="js/base-plugin.js"></script>

```

Call the inline editor!
```
  <script>
    $('.editable').initInlineEditor({service : 'service/HtmlDocumentService.asmx/UpdateHtmlDocument'});
  </script>
```

#Files

- FileReadWrite.cs - read html file, update html file. 
- HtmlAgilityPack - for reading html nodes, so we can save the content back to the correct node.
- HtmlDocumentService.asmx - web service to call the file read write cs class. You can call this from Javascript using Ajax, so you code can simply be written in HTML.

- tinymce - a wysiwig plugin used to capture editable content
- jQuery 1.12
- base-plugin.js 
      - initialise inline editor (base code used was modified from http://jsfiddle.net/egstudio/aFMWg/1/)
      - toggle out content for wysiwig 
      - capture new content
      - Ajax call to webservice and save new content 

