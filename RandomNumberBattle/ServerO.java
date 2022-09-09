import java.net.*;
import java.io.*;
import java.util.*;
/**
 *
 * @author vtmangum
 */
public class ServerO {
    
    // store the future clients in this vector 
    static Vector<Clients> vec = new Vector<>();
    //private ServerSocket server_socket = null;
    private DataInputStream dis = null; 
    // counter for clients 
    static int i = 0;
    
    public ServerO(int port) throws IOException{
        //Create a server socket, bound to port 2020
        ServerSocket server_socket = new ServerSocket(port);
        
        Socket socket;

        //infinite loop to listen for a clients request to connect
        while(true){
            //accept an incoming request
            socket = server_socket.accept();
            
            //input and output streams for sendi ng/revieving messages
            DataInputStream in = new DataInputStream(socket.getInputStream()); 
            DataOutputStream out = new DataOutputStream(socket.getOutputStream());

            //create a client object for each client
            Clients client = new Clients(socket,"client " + i, in, out);

            // Create a new Thread with this object. 
            Thread t = new Thread(client);

            // add this client to active clients list 
            vec.add(client); 

            // start thread. 
            t.start(); 
  
            // increment i for new client. 
            i++; 
              
        }     
    }
    
     public static void main(String[] args){
        int port = Integer.parseInt(args[0]);
        
        try{
            ServerO my_server = new ServerO(port);
        }
        catch(IOException IOException){
            System.err.print("Error");
        }
    }
}

// ClientHandler class 
class Clients implements Runnable  
{ 
    Scanner scn = new Scanner(System.in); 
    private String name; 
    private int gameNum;
    final DataInputStream in; 
    final DataOutputStream out; 
    Socket s; 
    boolean isloggedin; 
      
    // constructor 
    public Clients(Socket s, String name, 
                            DataInputStream in, DataOutputStream out) { 
        this.in = in; 
        this.out = out; 
        this.name = name; 
        this.s = s; 
        this.isloggedin=true; 
    } 
  
    @Override
    public void run() { 
   
        String received; 
        Boolean firstTime = true;
        String firstToken = "";
        while (true)  
        { 
            try
            {  
            // receive the string 
                received = in.readUTF();
                
                //here, we check to see if the client has input the correct username format.
                //If they have not, connection is denied. Variable firstTime is used to only ask for 
                //a username once.
                if (firstTime){
                    // break the string to find the name
                    StringTokenizer st = new StringTokenizer(received); 
                    firstToken = st.nextToken();

                    //check the first token
                    if(firstToken.equals("username")){
                        String equals = st.nextToken();
                        this.name = st.nextToken();
                        System.out.println("Server: Welcome "+ this.name);
                        //tell all connected clients Welcome "username"
                        for (Clients mc : ServerO.vec)
                        {
                            mc.out.writeUTF("Server: Welcome "+ this.name);
                            
                        }
                        firstTime = false;
                    }
                    //incorect username format input
                    else{
                        out.writeUTF("Incorrect format for username. Closing connection");
                        this.isloggedin=false; 
                        this.s.close(); 
                        break; 
                    }
                }

                //client types Bye, causing the client to disconnect
                else if(received.equals("Bye")){ 
                    this.isloggedin=false; 
                    this.s.close();
                    System.out.println("Server: "+ this.name+ " disconnected with a Bye message.");
                    for (Clients mc : ServerO.vec)
                    {
                        if(mc.isloggedin){
                            mc.out.writeUTF("Server: Goodbye "+ this.name);
                        }
                    } 
                    
                    break; 
                }
                
                //create an arraylist and add the users to it sequentiallly. Then, convert that list to an array and print
                //the array
                else if(received.equals("AllUsers")){
                    List<String> list = new ArrayList<String>();
                    for (Clients mc : ServerO.vec)
                        {
                            list.add(mc.name);
                            
                        }
                    String[] allUsers = new String[list.size()];
                    allUsers = list.toArray(allUsers);
                    for(String user : allUsers){

                        out.writeUTF(user);
                    }
                }

                /*
                 * This is the code for my Random number Battle game
                 * It assigns each client a random number. The client
                 * with the highest number wins the game.
                 */
                else if (received.equals("StartGame")) {
                    // Random number genreator with upperbound
                    Random rand = new Random();
                    int upperbound = 100;
                    
                    // The server loops through each client and sends them the instructions on how to play the game
                    System.out.println("Server: Starting Random Number Battle!");
                    System.out.println("Server: Each user will recieve a random number between 0 - 99. The user with the largest number wins!");
                    System.out.println("Server: Please type 'MyNumber' to reveal your number.");
                    for (Clients mc : ServerO.vec) {
                        mc.out.writeUTF("Server: Starting Random Number Battle!");
                        mc.out.writeUTF("Server: Each user will recieve a random number between 0 - 99. The user with the largest number wins!");
                        mc.out.writeUTF("Server: Please type 'MyNumber' to reveal your number.");
                        this.gameNum = rand.nextInt(upperbound);
                    }
                }
                // THis is the prompt to get each client to reveal their number
                // Both numbers are revealed and both clients can determine who wins the game.
                else if (received.equals("MyNumber")) {

                    // Loops through the clients and reveals the random number assigned to them.
                    System.out.println(this.name+ ": My number is " + this.gameNum);
                    for (Clients mc : ServerO.vec) {
                        mc.out.writeUTF(this.name+ ": My number is " + this.gameNum);
                    }

                }

                else if (isloggedin){
                    System.out.println(this.name+ ": " + received);
                    for (Clients mc : ServerO.vec)
                    {
                        mc.out.writeUTF(this.name+ ": " + received);
                         
                    }
                }


            } catch (IOException e) { 
                  
                System.out.println(e);; 
            }  
            
        } 
        try
        { 
            // closing resources 
            this.in.close(); 
            this.out.close(); 
            
        }catch(IOException e){ 
            e.printStackTrace(); 
        } 
    } 
} 