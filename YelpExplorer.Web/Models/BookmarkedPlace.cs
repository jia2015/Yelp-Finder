using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YelpExplorer.Web.Models
{
    public class BookmarkedPlace
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PlaceID { get; set; }
        public string PlaceName { get; set; }
        public string Address { get; set; }
        public string Category { get; set; }
        public Decimal Rating { get; set; }
        public DateTime TimeCreated { get; set; }
    }
}