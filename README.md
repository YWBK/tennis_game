# Background

# Functionality & MVPs

# Wireframes

# Technologies, Libraries, APIs

# Implementation Timeline

- Friday:  
    - Project setup:
        - Classes
            - MovingObject
            - Ball (inherits from MovingObject)
            - HumanPlayer (inherits from MovingObject)
            - ComputerPlayer (inherits from HumanPlayer)
            - Court
            - Net
            - Game
            - Index (entry)
        - HTML
            - Index
        - Webpack
    - Create MovingObject (excluding height)
    - Create Ball
    - Create HumanPlayer (any collision with the ball will count as a swing for now)
    - Make sure the velocities of the Ball and HumanPlayer are 'playable'
- Weekend
    - Create ComputerPlayer that will determine the shortest bath to intercept with the moving Ball's path and move accordingly.
    - Implement height to Ball and Player.
    - Create Court that detects collision with Ball if Ball height is 0. Based on location in court where Ball height is 0, Court will determine if Ball is in or out.
    - Create Net that detects collision with Ball if Ball height is less than Net height when crossing over the Net's position.
- Monday
    - Continue working on the Ball's height and collision detection.
- Tuesday
    - Add swing function to HumanPlayer.
    - Allow ComputerPlayer to use SwingFunction if in position.
    - Create Game that handles score keeping.
- Wednesday
    - Update Player from being a rectangle to a drawing with animations for moving and swinging.
    - Add start menu, instructions, sound toggle to Game
- Thursday
    - Deplay to GitHub.
    
Setup project, including getting webpack up and running. Implement a moving ball and human player that can detect collision and 'hit' the ball back. There will be no height variable yet. Implement a basic physics for the XY plane. 

