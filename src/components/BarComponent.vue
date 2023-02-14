<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "BarChart",
  components: { Line },
  props: {
    time: Object(),
    temp: Object(),
  },
  computed: {
    chartData() {
      return {
        labels: this.time,
        datasets: [
          {
            data: this.temp,
            label: `Температура °`,
            backgroundColor: "#f87979",
          },
        ],
      };
    },
    chartOptions() {
      return {
        label: "Dataset",
        responsive: true,
        backgroundColor: "#f87979",
        borderColor: "#f87979",
        fill: false,
      };
    },
  },
};
</script>
