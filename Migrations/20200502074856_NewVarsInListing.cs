using Microsoft.EntityFrameworkCore.Migrations;

namespace SaveOurFood.Migrations
{
    public partial class NewVarsInListing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccessTo",
                table: "Listings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ListingType",
                table: "Listings",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "NumberOfBathrooms",
                table: "Listings",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfBedrooms",
                table: "Listings",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfDoubleBeds",
                table: "Listings",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfSingleBeds",
                table: "Listings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessTo",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "ListingType",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "NumberOfBathrooms",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "NumberOfBedrooms",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "NumberOfDoubleBeds",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "NumberOfSingleBeds",
                table: "Listings");
        }
    }
}
