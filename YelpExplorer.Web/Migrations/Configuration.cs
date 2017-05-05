namespace YelpExplorer.Web.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using YelpExplorer.Web.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<YelpExplorer.Web.Data.YelpContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(YelpExplorer.Web.Data.YelpContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            
            base.Seed(context);

#if DEBUG
            if (context.Topics.Count() == 0)
            {
                var topic = new Topic()
                {
                    Title = "I love MVC",
                    Created = DateTime.Now,
                    Body = "I love ASP.NET MVC and I want everyone to know it",
                    Replies = new List<Reply>()
                      {
                        new Reply()
                        {
                           Body = "I love it too!",
                           Created = DateTime.Now
                        },
                        new Reply()
                        {
                           Body = "Me too",
                           Created = DateTime.Now
                        },
                        new Reply()
                        {
                           Body = "Aw shucks",
                           Created = DateTime.Now
                        },
                      }
                };

                context.Topics.Add(topic);

                var anotherTopic = new Topic()
                {
                    Title = "I like AngularJS too!",
                    Created = DateTime.Now,
                    Body = "AngularJS is popular"
                };

                context.Topics.Add(anotherTopic);

                try
                {
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    var msg = ex.Message;
                }
            }
#endif
        }
    }
        
}
