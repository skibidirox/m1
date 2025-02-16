import { ChakraProvider, Container, Box, Stack, Heading, Text, useToast, SimpleGrid, Icon, IconButton, useColorMode, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import WaitlistForm from './components/WaitlistForm'
import { FaSun, FaMoon, FaChartLine, FaHashtag, FaRocket, FaTwitter } from 'react-icons/fa'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

function FeatureCard({ icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <Box
      p={6}
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(8px)"
      borderRadius="xl"
      boxShadow="lg"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      <Icon as={icon} w={10} h={10} mb={4} color="purple.500" />
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
  )
}

// Mock data for Jeeter listings
const jeeterListings = [
  {
    id: 1,
    username: 'Unknown',
    content: 'Trading on ....',
    engagement: 1234,
    timestamp: '2h ago',
    status: 'trading'
  },
  {
    id: 2,
    username: 'Mits',
    content: 'Trading on ....',
    engagement: 892,
    timestamp: '4h ago',
    status: '-'
  },
  // Add more mock data as needed
]

function JeeterTracker() {
  const { colorMode } = useColorMode()
  
  return (
    <Box 
      bg={colorMode === 'light' ? 'blue.50' : 'blue.900'}
      borderRadius="xl"
      p={6}
      boxShadow="xl"
    >
      <Stack spacing={4}>
        <Heading size="lg">Jeeter Activity Tracker</Heading>
        <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'} mb={4}>
          This tool is mainly developed by rox to help us tracking jeeter activity on memejob
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Content</Th>
              <Th>Engagement</Th>
              <Th>Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jeeterListings.map((jeeter) => (
              <Tr key={jeeter.id}>
                <Td>
                  <Stack direction="row" align="center">
                    <Icon as={FaTwitter} color="twitter.500" />
                    {jeeter.username}
                  </Stack>
                </Td>
                <Td>{jeeter.content}</Td>
                <Td isNumeric>{jeeter.engagement}</Td>
                <Td>{jeeter.timestamp}</Td>
                <Td>
                  <Badge
                    colorScheme={jeeter.status === 'trending' ? 'green' : 'orange'}
                    borderRadius="full"
                    px={2}
                  >
                    {jeeter.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Box>
  )
}

function App() {
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  const handleSubmit = (email: string, walletId: string, social: string) => {
    console.log('Submitted:', { email, walletId, social })
    toast({
      title: 'Thank you for joining!',
      description: 'We\'ll keep you updated about our meme tracker.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <ChakraProvider theme={theme}>
      <Box 
        minH="100vh" 
        bg={colorMode === 'light' ? 'purple.50' : 'gray.900'}
        position="relative"
        overflow="hidden"
      >
        {/* Animated background shapes */}
        <Box
          position="absolute"
          top="-10%"
          left="-10%"
          width="120%"
          height="120%"
          opacity="0.1"
          bgGradient="radial(circle at 30% 20%, purple.400 0%, transparent 70%)"
          animation="pulse 15s infinite"
        />
        <Box
          position="absolute"
          top="-10%"
          left="-10%"
          width="120%"
          height="120%"
          opacity="0.1"
          bgGradient="radial(circle at 70% 80%, pink.400 0%, transparent 70%)"
          animation="pulse 20s infinite reverse"
        />

        {/* Main content */}
        <Box position="relative" py={20}>
          <Container maxW="container.xl">
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              position="absolute"
              top={4}
              right={4}
              onClick={toggleColorMode}
            />
            
            <Stack spacing={16} align="center">
              <Box textAlign="center">
                <Heading 
                  mb={4} 
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  bgClip="text"
                  fontSize={{ base: "4xl", md: "6xl" }}
                  fontWeight="bold"
                >
                  Hedera Meme Tracker
                </Heading>
                <Text 
                  fontSize={{ base: "lg", md: "xl" }} 
                  color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                  maxW="2xl"
                  mx="auto"
                >
                  Track, analyze, and discover trending memes on the Hedera network.
                  Join our waitlist to get early access!
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="full">
                <FeatureCard
                  icon={FaChartLine}
                  title="Real-time Tracking"
                  description="Monitor meme performance and virality across the Hedera network instantly"
                />
                <FeatureCard
                  icon={FaHashtag}
                  title="Trend Analysis"
                  description="AI-powered insights to identify emerging meme trends before they go viral"
                />
                <FeatureCard
                  icon={FaRocket}
                  title="Creator Tools"
                  description="Launch and track your memes with advanced analytics and engagement metrics"
                />
              </SimpleGrid>

              {/* Add Jeeter Tracker section */}
              <Box w="full">
                <JeeterTracker />
              </Box>

              <Box 
                bg={colorMode === 'light' ? 'blue.50' : 'blue.900'}
                backdropFilter="blur(10px)"
                borderRadius="2xl"
                p={8}
                boxShadow="2xl"
                w="full"
                maxW="container.md"
                mx="auto"
              >
                <WaitlistForm onSubmit={handleSubmit} />
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App
