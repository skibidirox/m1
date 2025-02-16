import { useState, useCallback } from 'react'
import { 
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorMode,
  InputGroup,
  InputLeftAddon,
  Tooltip,
  Icon,
  InputRightElement,
  IconButton,
  useToast,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import { FaTwitter, FaQuestionCircle, FaCheckCircle, FaTimesCircle, FaCopy } from 'react-icons/fa'

interface WaitlistFormProps {
  onSubmit: (email: string, walletId: string, social: string) => void
}

const WaitlistForm = ({ onSubmit }: WaitlistFormProps) => {
  const [email, setEmail] = useState('')
  const [walletId, setWalletId] = useState('')
  const [social, setSocial] = useState('')
  const [walletError, setWalletError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { colorMode } = useColorMode()
  const toast = useToast()
  const { hasCopied, onCopy } = useClipboard(walletId)

  const validateWalletId = useCallback((value: string) => {
    const walletPattern = /^0\.0\.[0-9]+$/
    if (!walletPattern.test(value)) {
      setWalletError('Please enter a valid Hedera wallet ID (format: 0.0.xxx)')
      return false
    }
    setWalletError('')
    return true
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateWalletId(walletId)) {
      setIsSubmitting(true)
      try {
        await onSubmit(email, walletId, social)
        toast({
          title: 'Success!',
          description: 'You have been added to the waitlist.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
        setEmail('')
        setWalletId('')
        setSocial('')
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to join waitlist. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const isEmailValid = email.includes('@') && email.includes('.')

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit}
      transition="all 0.2s"
      transform={isSubmitting ? 'scale(0.98)' : 'scale(1)'}
    >
      <Stack direction="column" gap={4}>
        <FormControl isRequired>
          <FormLabel color="white">Email Address</FormLabel>
          <InputGroup>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              bg={colorMode === 'light' ? 'white' : 'gray.800'}
              border="2px"
              borderColor="purple.200"
              _hover={{
                borderColor: 'pink.300',
                transform: 'translateY(-1px)',
              }}
              _focus={{
                borderColor: 'purple.400',
                boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
              isDisabled={isSubmitting}
            />
            <InputRightElement>
              {email && (
                <Icon
                  as={isEmailValid ? FaCheckCircle : FaTimesCircle}
                  color={isEmailValid ? 'green.500' : 'red.500'}
                  transition="all 0.2s"
                />
              )}
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired isInvalid={!!walletError}>
          <FormLabel color="white">
            Hedera Wallet ID
            <Tooltip 
              label="Your Hedera account ID (e.g., 0.0.123456)" 
              placement="top"
              hasArrow
            >
              <IconButton
                aria-label="Hedera wallet ID info"
                icon={<FaQuestionCircle />}
                size="xs"
                variant="ghost"
                ml={2}
              />
            </Tooltip>
          </FormLabel>
          <InputGroup>
            <Input
              value={walletId}
              onChange={(e) => {
                setWalletId(e.target.value)
                validateWalletId(e.target.value)
              }}
              placeholder="0.0.xxx"
              bg={colorMode === 'light' ? 'white' : 'gray.800'}
              border="2px"
              borderColor={walletError ? "red.300" : "purple.200"}
              _hover={{
                borderColor: walletError ? "red.400" : "pink.300",
                transform: 'translateY(-1px)',
              }}
              _focus={{
                borderColor: walletError ? "red.500" : "purple.400",
                boxShadow: walletError 
                  ? '0 0 0 1px var(--chakra-colors-red-500)' 
                  : '0 0 0 1px var(--chakra-colors-purple-400)',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
              isDisabled={isSubmitting}
            />
            {walletId && (
              <InputRightElement>
                <Tooltip
                  label={hasCopied ? 'Copied!' : 'Copy wallet ID'}
                  placement="top"
                  hasArrow
                >
                  <IconButton
                    aria-label="Copy wallet ID"
                    icon={<FaCopy />}
                    size="sm"
                    variant="ghost"
                    onClick={onCopy}
                  />
                </Tooltip>
              </InputRightElement>
            )}
          </InputGroup>
          <FormErrorMessage>{walletError}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel color="white">Twitter Handle (Optional)</FormLabel>
          <InputGroup>
            <InputLeftAddon 
              children={<Icon as={FaTwitter} color="twitter.500" />}
              bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            />
            <Input
              value={social}
              onChange={(e) => setSocial(e.target.value.replace('@', ''))}
              placeholder="username"
              bg={colorMode === 'light' ? 'white' : 'gray.800'}
              border="2px"
              borderColor="purple.200"
              _hover={{
                borderColor: 'pink.300',
                transform: 'translateY(-1px)',
              }}
              _focus={{
                borderColor: 'purple.400',
                boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
              isDisabled={isSubmitting}
            />
          </InputGroup>
          <Text fontSize="sm" color="white" mt={1}>
            We'll notify you when your spot is ready
          </Text>
        </FormControl>

        <Button
          type="submit"
          size="lg"
          width="full"
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          _hover={{
            bgGradient: 'linear(to-r, purple.600, pink.600)',
            transform: 'scale(1.02)',
          }}
          _active={{
            bgGradient: 'linear(to-r, purple.700, pink.700)',
            transform: 'scale(0.98)',
          }}
          transition="all 0.2s"
          isDisabled={!!walletError}
          isLoading={isSubmitting}
          loadingText="Joining..."
        >
          Join Waitlist
        </Button>
      </Stack>
    </Box>
  )
}

export default WaitlistForm