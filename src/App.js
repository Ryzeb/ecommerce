import {useState, useEffect} from "react"; 
import{Container, Text, Divider, Box, Image, SimpleGrid, Flex, Button,} from "@chakra-ui/react"  
import{FiShoppingCart, FiShoppingBag} from "react-icons/fi"  
import Butter from "buttercms"  
const butter = Butter("06e766d7f8affcc50b70db897034f74652650bbd"); 
function App(){  
    const[products, setProducts] = useState([]); 
    useEffect(() => {
        async function fetchData(){
            const res = await butter.content.retrieve(["electron"],{
                order: "name",
            }); 
            const{data} = await res.data; 
            const allProducts = data.electron; 
            setProducts(allProducts);

        } 
        fetchData();
    }, []); 
    return(
        <Container maxW="container.xl" h="100vh" >  
          <Flex justifyContent="space-between" alignContent ="center"> 
            <Text as="a" href="/" fontSize="2rem" color="gray.900" fontFamily="sans-serif" my="5px"> Electron</Text>   
            <Button my="5px" colorScheme="green" variant="ghost" leftIcon={<FiShoppingBag size="24px" />} size="lg" p={2} className ="snipcart-checkout">View cart</Button> 

              
            
          </Flex>  
          <Divider/> 
          <Box mt={4}>  
             <SimpleGrid  minChildWidth="300px"  align="center"  justify="center" spacing="40px" mb={32}>  
               {products.map((product) => (
                   <Box bg="white" maxW="sm"  borderWidth ="1px"  rounded = "lg"  shadow = "lg"  _hover ={{shadow: "dark-lg"}}   key = {product.id}>  
                       <Image  h="350px"  fit="cover" src={product.image}  alt = "error" roundedTop = "lg"/>    
                       <Box p = "6">  
                          <Flex  mt = "1" justifyContent="space-between" alignContent="center">  
                            <Text fontFamily="sans-serif"  fontSize="2xl"  fontWeight="semibold"  as = "h4"  textTransform="uppercase"  lineHeight="tight">   
                               {product.name} 
                            </Text>   
                            <Text as = "h4" fontSize="2xl" fontWeight="bold" color = "teal.900"> ${product.price}</Text>
                          </Flex> 
                          <Text  mt={2}  color="grey.500"  display ={{base: "none", md: "flex"}}> {product.description}</Text>   
                          <Button  leftIcon={<FiShoppingCart size = "24px"/>}  size = 'lg' mt = {4} isFullWidth  colorScheme="blue" variant="outline" alignSelf={"center"}className = " snipcart-add-item" data-item-id ={product.id}  data-item-image={product.image} data-item-name ={product.name} data-item-url ="/" data-item-description = {product.description} data-item-price ={product.price}>
                              Add to Cart
                          </Button>
                       </Box>
                   </Box>
               ))}
             </SimpleGrid>
          </Box>
        </Container>
    )

} 
export default App;