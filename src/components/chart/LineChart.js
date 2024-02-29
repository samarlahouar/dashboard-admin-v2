

import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>projet à réaliser</Title>
          <Paragraph className="lastweek">
            cette année <span className="bnb2">30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Projet</li>
            <li>{<MinusOutlined />} Les taches  </li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
