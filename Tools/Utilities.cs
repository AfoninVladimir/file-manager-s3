using Entities;

namespace Tools
{
    public class Utilities
    {
        public static Dictionary<int, string> unit { get; set; } = new()
        {
            [0] = "Б",
            [1] = "КБ",
            [2] = "МБ",
            [3] = "ГБ",
        };

        public static UnitSize CalculationSize(long byteSize)
        {
            double size = byteSize;
            var count = 0;

            for (int i = 0; i < 4; i++)
            {
                var lenNum = Math.Floor(Math.Log10(size) + 1);
                count = i;

                if (lenNum > 3)
                {
                    size /= 1024;
                }
                else
                {
                    break;
                }
            }

            return new UnitSize { Size = Math.Round(size, 2), Unit = unit[count] };
        }
    }
}
