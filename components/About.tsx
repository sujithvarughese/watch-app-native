"use client"
import {Container, Title, Text, List, ThemeIcon, Box} from '@mantine/core';
import {IconCheck} from '@tabler/icons-react';

const About = () => {
  return (
    <Container size="lg" py="xl">
      <Box mb="xl">
        <Text size="lg">
          Authentime is a cutting-edge application that leverages artificial intelligence
          to analyze and authenticate luxury timepieces. Our sophisticated AI system
          examines various aspects of watches to help determine their authenticity.
        </Text>
      </Box>

      <Title order={2} mb="md">How It Works</Title>
      <List
        spacing="sm"
        size="lg"
        mb="xl"
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCheck size="1rem"/>
          </ThemeIcon>
        }
      >
        <List.Item>Upload clear images of your watch</List.Item>
        <List.Item>Our AI analyzes multiple authentication factors</List.Item>
        <List.Item>Receive detailed authenticity ratings and analysis</List.Item>
        <List.Item>Get comprehensive insights about your timepiece</List.Item>
      </List>


      <Text c="dimmed" ta="center" size="sm">
        Authentime is designed to assist in watch authentication but should not be
        considered as a definitive authentication service. For official authentication,
        please consult authorized dealers or brand service centers.
      </Text>
    </Container>
  );
};

export default About;