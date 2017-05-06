using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using YelpExplorer.Web.Data.EntityConfiguration;
using YelpExplorer.Web.Models;

namespace YelpExplorer.Web.Data
{
    public class YelpContext : DbContext
    {
        public YelpContext()
            : base("yelpDB")
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;

            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<YelpContext, YelpContextMigrationConfiguration>());
        }

        public DbSet<BookmarkedPlace> BookmarkedPlaces { get; set; }

        public DbSet<Topic> Topics { get; set; }
        public DbSet<Reply> Replies { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new BookmarkedPlaceConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}