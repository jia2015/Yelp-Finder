using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YelpExplorer.Web.Models;

namespace YelpExplorer.Web.Data.Repositories
{
    public interface IYelpRepository
    {
        IQueryable<BookmarkedPlace> GetBookmarkedPlaces(string userName);

        bool UserNameExists(string userName);

        int SavePlace(BookmarkedPlace bookmarkedPlace);
    }

    public class YelpRepository : IYelpRepository
    {
        private YelpContext _context;
        public YelpRepository()
        {
            _context = new YelpContext();
        }

        public IQueryable<BookmarkedPlace> GetBookmarkedPlaces(string userName)
        {
            return _context.BookmarkedPlaces.Where(b => b.UserName == userName).AsQueryable();
        }

        public bool UserNameExists(string userName)
        {
            return _context.BookmarkedPlaces.Any(b => b.UserName == userName);
        }

        public int SavePlace(BookmarkedPlace bookmarkedPlace)
        {
            var placeAlreadyMarked = _context.BookmarkedPlaces.Any(b => b.UserName == bookmarkedPlace.UserName 
                                                                    && b.PlaceID == bookmarkedPlace.PlaceID);
            if (placeAlreadyMarked)
            {
                return -1;
            }

            bookmarkedPlace.TimeCreated = DateTime.Now;
            _context.BookmarkedPlaces.Add(bookmarkedPlace);

            return _context.SaveChanges();
        }
    }
}