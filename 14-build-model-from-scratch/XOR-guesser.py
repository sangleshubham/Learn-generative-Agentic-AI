import torch
import torch.nn as nn

inputArray = [
    [0,0],
    [0,1],
    [1,0],
    [1,1]
]

outputArray = [
    [0],
    [1],
    [1],
    [0]
]

class XORNetwork (nn.Module) : 
    def __init__(self):
        super().__init__()
        
        ## Hidden layer
        self.hidden_layer = nn.Linear(2, 4)

        ## Output layer
        self.output_layer = nn.Linear(4, 1)

        self.sigmoid = nn.Sigmoid()
    
    def forward(self, x):
        # x is a input

        # pass x to hidden layer
        x = self.hidden_layer(x)

        # pass this i curl creater
        x = self.sigmoid(x)

        # pass x to output layer.
        x = self.output_layer(x)

        # Pass to a activation function
        x = self.sigmoid(x)

        return x


# x = Inputs
# y = mx + c -- m are weights and c is bias --> y = Wx + b
# W = weights
# b = bias
# y = Wx + b

X =  torch.tensor(inputArray, dtype=torch.float32)
y = torch.tensor(outputArray, dtype=torch.float32)

model = XORNetwork()
optimiser = torch.optim.SGD(model.parameters(), lr=0.1)
calculateLoss = nn.BCELoss()

for i in range(10000):
    # let train the model

    optimiser.zero_grad()

    output = model(X)
    
    # find the loss
    loss = calculateLoss(output, y)

    loss.backward()

    optimiser.step()
    if (i + 1) % 500 == 0:
        print(f"Epoch {i+1}, Loss: {loss.item():.4f}")


# Switch to evaluation mode

while True:
    print("Enter your input: ")
    input_1 = int(input())
    input_2 = int(input())
    
    model.eval()
    with torch.no_grad():
        final_output = model(torch.tensor([input_1, input_2], dtype=torch.float32))
        predictions = final_output.round()
        print(predictions)


