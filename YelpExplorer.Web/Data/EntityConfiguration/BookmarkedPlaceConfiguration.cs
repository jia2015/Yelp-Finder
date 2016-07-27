using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.ModelConfiguration;
using YelpExplorer.Web.Models;

namespace YelpExplorer.Web.Data.EntityConfiguration
{
    public class BookmarkedPlaceConfiguration : EntityTypeConfiguration<BookmarkedPlace>
    {
        public BookmarkedPlaceConfiguration()
        {
            this.Property(c => c.UserName).IsRequired().HasMaxLength(20);

            this.Property(c => c.PlaceID).IsRequired().HasMaxLength(50);

            this.Property(c => c.PlaceName).IsRequired().HasMaxLength(50);

            this.Property(c => c.Address).IsOptional().HasMaxLength(50);

            this.Property(c => c.Category).IsOptional().HasMaxLength(50);

            this.Property(c => c.Rating).IsOptional();

            this.Property(c => c.TimeCreated).IsRequired();
        }
    }
}