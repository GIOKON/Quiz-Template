using Microsoft.EntityFrameworkCore.Migrations;

namespace SaveOurFood.Migrations
{
    public partial class TotalCostReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TotalCost",
                table: "Reservations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalCost",
                table: "Reservations");
        }
    }
}
