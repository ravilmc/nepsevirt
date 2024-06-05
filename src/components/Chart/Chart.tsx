import { ColorType, createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';

export interface DataStateTypes {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const Chart = ({ data }: { data: DataStateTypes[] }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const newChart: IChartApi = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 600,
        layout: {
          background: { type: ColorType.Solid, color: '#131722' },
          textColor: '#d9d9d9',
        },
        grid: {
          vertLines: {
            color: '#2B2B43',
          },
          horzLines: {
            color: '#2B2B43',
          },
        },
      });

      setChart(newChart);

      return () => {
        newChart.remove();
      };
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (chart) {
        chart.resize(chartContainerRef.current?.clientWidth || 0, 600);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [chart]);

  useEffect(() => {
    if (chart && data) {
      const candlestickSeries: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries();
      candlestickSeries.setData(data);
    }
  }, [chart, data]);

  return (
    <>
      <div ref={chartContainerRef} style={{ border: `2px solid #2d2f4d`, borderRadius: `.7rem` }}></div>
    </>
  );
};
