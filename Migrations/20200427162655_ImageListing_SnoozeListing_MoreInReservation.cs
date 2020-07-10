using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SaveOurFood.Migrations
{
    public partial class ImageListing_SnoozeListing_MoreInReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Listings");

            migrationBuilder.AddColumn<DateTime>(
                name: "BookedDate",
                table: "Reservations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Guest",
                table: "Reservations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Reservations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Listings",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Snooze",
                table: "Listings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookedDate",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "Guest",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Snooze",
                table: "Listings");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Listings",
                type: "bit",
                nullable: true);
        }
    }
}
