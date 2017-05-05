using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using YelpExplorer.Web.Models;
using YelpExplorer.Web.Services;

namespace YelpExplorer.Web.Controllers
{
    public class ContactController : ApiController
    {
        private IMailService _mail;

        public ContactController(IMailService mail)
        {
            _mail = mail;
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody] Contact model)
        {
            var msg = string.Format("Comment From: {1}{0}Email:{2}{0}Website: {3}{0}Comment:{4}",
                            Environment.NewLine,
                            model.Name,
                            model.Email,
                            model.Website,
                            model.Comment);

            if (_mail.SendMail("noreply@yourdomain.com",
                    "foo@yourdomain.com",
                    "Website Contact",
                    msg) || true)   //mock
            {
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
    }
}
