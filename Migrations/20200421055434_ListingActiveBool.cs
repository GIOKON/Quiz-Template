using Microsoft.EntityFrameworkCore.Migrations;

namespace SaveOurFood.Migrations
{
    public partial class ListingActiveBool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Listings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Listings");
        }
    }
}
