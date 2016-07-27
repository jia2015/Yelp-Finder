namespace YelpExplorer.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial_migration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BookmarkedPlaces",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 20),
                        PlaceID = c.String(nullable: false, maxLength: 50),
                        PlaceName = c.String(nullable: false, maxLength: 50),
                        Address = c.String(maxLength: 50),
                        Category = c.String(maxLength: 50),
                        Rating = c.Decimal(precision: 18, scale: 2),
                        TimeCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.BookmarkedPlaces");
        }
    }
}
