import { BarChart } from '@mantine/charts';
import {Box, Text} from "@mantine/core";
import type { WatchDetails } from "@/app/page";



const Results = ({ watchDetails }: {watchDetails: WatchDetails | null}) => {

  const { name, details, results } = watchDetails || { name: '', details: '', results: []}

  console.log(watchDetails)
  return (
    <Box maw={900} mx="auto" p={40} mt={20}>
    <Text size="xl" mb={10}>{name}</Text>
      <Text size="sm" mb={10}>{details}</Text>
      {results?.length > 0 &&
      <BarChart
        h={400}
        data={results}
        type="default"
        withBarValueLabel={true}
        withTooltip={false}
        dataKey="category"
        orientation="vertical"
        xAxisLabel="Rating"
        xAxisProps={{domain: [0, 10]}}
        barProps={{radius: 10 }}
        series={[{name: 'rating', color: 'blue.6'}]}
        getBarColor={(value) => getColor(value)}
      />
      }
      {results?.map(result =>
        <Box
          key={result.category}
          p="md"
          mb="md"
          bg="gray.0"
          style={{
            borderRadius: 8,
            transition: 'transform 0.2s',
            '&:hover': {transform: 'translateY(-2px)'}
          }}
        >
          <Text fw={700} mb={8}>{result.category} - {result.rating} / 10</Text>
          <Text size="sm" c="gray.7">{result.comments}</Text>
        </Box>
      )}
    </Box>
  );
};

const getColor = (rating: number) => {
  if (rating >= 8) {
    return 'green.6';
  }
  if (rating >= 6) {
    return 'yellow.5';
  }
  return 'red.6';
}

export default Results;