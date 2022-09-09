import java.io.*; 
import java.net.*; 
import java.util.Scanner; 
/**
 *
 * @author vtmangum
 */
public class Client2 {
    
    public Client2(String address, int port) throws UnknownHostException, IOException{
        Scanner scanner = new Scanner(System.in);  

          
        // establishing the connection 
        Socket socket = new Socket(address, port); 

        System.out.println("Enter the username: ");
          
        // obtaining input and out stream 
        DataInputStream in = new DataInputStream(socket.getInputStream()); 
        DataOutputStream out = new DataOutputStream(socket.getOutputStream()); 
  
        // sendMessage thread to take care of getting all messages sent from server
        Thread sendMessage = new Thread(new Runnable()  
        { 
            @Override
            public void run() { 
                while (true) { 
  
                    // read the message to deliver. 
                    String msg = scanner.nextLine(); 
                      
                    try { 
                        // write on the output stream 
                        out.writeUTF(msg); 
                    } catch (IOException e) { 
                        e.printStackTrace(); 
                    } 
                } 
            } 
        }); 
          
        // readMessage thread to take care of sending all messages sent to the server
        Thread readMessage = new Thread(new Runnable()  
        { 
            @Override
            public void run() { 
  
                while (true) { 
                    try { 
                        // read the message sent to this client 
                        String msg = in.readUTF(); 
                        System.out.println(msg); 
                    } catch (IOException e) { 
                        System.exit(1);
                    } 
                } 
            } 
        }); 
  
        sendMessage.start(); 
        readMessage.start(); 
    }

    public static void main(String args[]) throws UnknownHostException, IOException 
    { 
        String address = args[0];//get address from client
        int port = Integer.parseInt(args[1]);//get port number from client
		Client1 client = new Client1(address, port); 
  
    } 


}