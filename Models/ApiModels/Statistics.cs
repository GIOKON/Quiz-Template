using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SaveOurFood.Models.ApiModels
{
    public class Statistics
    {
        public List<ChartStats> ChartStats = new List<ChartStats>();

        public List<StatsObject> Stats = new List<StatsObject>();
    }
}
