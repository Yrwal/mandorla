using Library.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// HtmlDocumentService to manipulate a html document
/// </summary>
[WebService(Namespace = "http://local.demo.com/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class HtmlDocumentService : System.Web.Services.WebService
{
    [WebMethod]
    public string UpdateHtmlDocument(string fileName, string content, string elementId)
    {
        FileReadWrite file = new FileReadWrite(fileName);
        file.UpdateHtmlDocument(content, elementId);
        file.SaveHtmlDocument();
        return file.ReadHtmlDocument(elementId);
    }
}
