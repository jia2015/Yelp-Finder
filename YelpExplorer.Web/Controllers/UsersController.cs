using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using YelpExplorer.Web.Data.Repositories;

namespace YelpExplorer.Web.Controllers
{
    public class UsersController : ApiController
    {
        private IYelpRepository _repo;
        public UsersController(IYelpRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public bool Get(string userName)
        {
            return _repo.UserNameExists(userName);
        }

    }
}
