using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Library.IO
{
    public class FileReadWrite
    {
        private string _filePath = ConfigurationManager.AppSettings["Site.FilePath"].ToString();
        private HtmlDocument _document;

        private string _fileName;
        

        public FileReadWrite(string fileName)
        {
            _fileName = fileName;
        }

        public string ReadHtmlDocument(string elementId)
        {
            List<string> htmlList = new List<string>();
                        
            LoadHtmlDocument();
            
            HtmlNode[] nodes = _document.DocumentNode.SelectNodes("//div[@id='"+ elementId + "']").ToArray();

            foreach (HtmlNode item in nodes)
            {
                htmlList.Add(item.InnerHtml);
            }

            return string.Join("", htmlList.ToArray());            
        }

        public string UpdateHtmlDocument(string content, string elementId)
        {
            LoadHtmlDocument();
            
            HtmlNode node = _document.DocumentNode.SelectNodes("//div[@id='"+ elementId + "']").FirstOrDefault();
            node.InnerHtml = HttpUtility.UrlDecode(content);

            return node.InnerHtml;
        }  

        public void SaveHtmlDocument()
        {
            _document.Save(_filePath + _fileName);
        }

        private void LoadHtmlDocument()
        {
            _document = new HtmlDocument();
            // TODO: encoding;

            _document.Load(_filePath + _fileName);
        }
    }
}
