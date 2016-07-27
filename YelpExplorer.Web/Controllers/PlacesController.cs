using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using YelpExplorer.Web.Data.Repositories;
using YelpExplorer.Web.Models;

namespace YelpExplorer.Web.Controllers
{
    public class PlacesController : ApiController
    {
        private IYelpRepository _repo;
        public PlacesController(IYelpRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<BookmarkedPlace> Get(string userName, int page = 0, int pageSize = 4)
        {
            IQueryable<BookmarkedPlace> query;

            query = _repo.GetBookmarkedPlaces(userName).OrderByDescending(b => b.TimeCreated);

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            var paginationHeader = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
            };

            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
                                                                Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

            var results = query.Skip(pageSize * page).Take(pageSize).ToList();

            return results;
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody] BookmarkedPlace bookmarkedPlace)
        {
            var result = _repo.SavePlace(bookmarkedPlace);

            if (result == 1)
            {
                return Request.CreateResponse(HttpStatusCode.Created, bookmarkedPlace);
            }
            else if (result == -1)
            {
                return Request.CreateResponse(HttpStatusCode.NotModified,
                    string.Format("Place: {0} already saved for User: {1}", bookmarkedPlace.PlaceName, bookmarkedPlace.UserName));
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not save to the database.");
            }
        }

    }
}
