"""
requirements ::
    1. pip install numpy = 1.25.0
    2. pip install pygame = 2.5.0
"""

"""
INSPIRED BY :: https://github.com/Rohan-231
"""


import math
import numpy  # to build matrix
import pygame  # graphics

TOTAL_ROWS = 6
TOTAL_COLS = 7
BLACK = (0,0,0)
BLUE = (0,0,255)
YELLOW = (255,255,0)
RED = (255,0,0)
ACTIVE_PLAYER = 1
ACTIVE_COLOR = RED
CIRCLE = "circle"
SQUARE = "square"
WINNER = 0

SQUARE_SIZE = 80
CIRCLE_RADIUS = SQUARE_SIZE/2 - 0.1*SQUARE_SIZE
BOARD_WIDTH = TOTAL_COLS*SQUARE_SIZE
BOARD_HEIGHT = (TOTAL_ROWS+1)*SQUARE_SIZE
SIZE = (BOARD_WIDTH,BOARD_HEIGHT)


pygame.init()
pygame.display.set_caption("BINGO!!!")
screen = pygame.display.set_mode(SIZE)


def create_board():
    board = numpy.zeros((TOTAL_ROWS,TOTAL_COLS))
    for row in range(TOTAL_ROWS):
        for col in range(TOTAL_COLS):
            pygame.draw.rect(screen,BLUE,(col*SQUARE_SIZE, (row+1)*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE))
            pygame.draw.circle(screen,BLACK,( col*SQUARE_SIZE + SQUARE_SIZE/2, (row+1)*SQUARE_SIZE + SQUARE_SIZE/2 ),CIRCLE_RADIUS)
    pygame.display.update()
    return board

def is_valid_location(board,row,col):
    if board[row][col] == 0:
        return True
    else:
        return False

def check_input(col):
    if col not in range(0,TOTAL_COLS):
        return False

def drop_coin(board,col,player):
    for row in range(TOTAL_ROWS-1,-1,-1):
        if is_valid_location(board,row,col):
            board[row][col] = player
            pygame.draw.circle(screen,ACTIVE_COLOR,( col*SQUARE_SIZE + SQUARE_SIZE/2, (row+1)*SQUARE_SIZE + SQUARE_SIZE/2 ),CIRCLE_RADIUS)
            pygame.display.update()
            return row
    return -1

def change_player():
    global ACTIVE_PLAYER
    global ACTIVE_COLOR
    if ACTIVE_PLAYER==1:
        ACTIVE_PLAYER=2
        ACTIVE_COLOR=YELLOW
    elif ACTIVE_PLAYER==2:
        ACTIVE_PLAYER=1
        ACTIVE_COLOR=RED

def winning_move(row,col,player,board):
    global WINNER
    # horizontal right:
    for row in range(TOTAL_ROWS-1,-1,-1):
        for col in range(TOTAL_COLS-3):
            if board[row][col]==player:
                if board[row][col]==board[row][col+1] and board[row][col]==board[row][col+2] and board[row][col]==board[row][col+3]:
                    WINNER = player
                    return True
            
    # vertical up:
    for col in range(TOTAL_COLS):
        for row in range(TOTAL_ROWS-1,2,-1):
            if board[row][col]==player:
                if board[row][col]==board[row-1][col] and board[row][col]==board[row-2][col] and board[row][col]==board[row-3][col]:
                    WINNER = player
                    return True
    
    # check +ve slopes:
    for row in range(TOTAL_ROWS-1,2,-1):
        for col in range(TOTAL_COLS-3):
            if board[row][col]==player:
                if board[row][col]==board[row-1][col+1] and board[row][col]==board[row-2][col+2] and board[row][col]==board[row-3][col+3]:
                    WINNER = player
                    return True
    
    # check -ve slopes:
    for row in range(TOTAL_ROWS-1,2,-1):
        for col in range(TOTAL_COLS-1,2,-1):
            if board[row][col]==player:
                if board[row][col]==board[row-1][col-1] and board[row][col]==board[row-2][col-2] and board[row][col]==board[row-3][col-3]:
                    WINNER = player
                    return True
                
    return False

def declare_winner():
    WINNER_COLOR = RED
    if WINNER==1:
        WINNER_COLOR=RED
    elif WINNER==2:
        WINNER_COLOR=YELLOW
    declare = f"Player {WINNER} Wins!!"
    myFont = pygame.font.SysFont("verdana",int(SQUARE_SIZE*0.75))
    myText = myFont.render(declare,True,WINNER_COLOR,BLACK)
    pygame.draw.rect(screen,BLACK,(0, 0, BOARD_WIDTH, SQUARE_SIZE))
    screen.blit(myText,( (BOARD_WIDTH-myText.get_width())/2, (SQUARE_SIZE-myText.get_height())/2) )
    pygame.display.update()
    print(declare)
    pygame.time.wait(4000)
    pygame.quit()

game_board = create_board()
print(game_board)

game_over = False
while not game_over:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_over = True
        # Player 1(Red)
        if event.type == pygame.MOUSEBUTTONDOWN and ACTIVE_PLAYER==1:
            ACTIVE_COLOR = RED
            print("Player 1: Make your selection (0-6)")
            col = math.floor(event.pos[0]/SQUARE_SIZE)
            if check_input(col)==False:
                print("Enter valid option...")
                continue
            row = drop_coin(game_board,col,ACTIVE_PLAYER)
            if row == -1:
                print("Enter valid option...")
                continue
            if winning_move(row,col,ACTIVE_PLAYER,game_board):
                game_over=True
            change_player()
        # Player 2(Yellow)
        elif event.type == pygame.MOUSEBUTTONDOWN and ACTIVE_PLAYER==2:
            ACTIVE_COLOR = YELLOW
            print("Player 2: Make your selection (0-6)")
            col = math.floor(event.pos[0]/SQUARE_SIZE)
            if check_input(col)==False:
                print("Enter valid option...")
                continue
            row = drop_coin(game_board,col,ACTIVE_PLAYER)
            if row == -1:
                print("Enter valid option...")
                continue
            if winning_move(row,col,ACTIVE_PLAYER,game_board):
                game_over=True
            change_player()
        if event.type == pygame.MOUSEMOTION:
            pygame.draw.rect(screen,BLACK,(0, 0, BOARD_WIDTH, SQUARE_SIZE))
            pygame.draw.circle(screen,ACTIVE_COLOR,( event.pos[0], int(SQUARE_SIZE/2)),CIRCLE_RADIUS)
            pygame.display.update()
        if event.type == pygame.MOUSEBUTTONDOWN:
            # print(event.pos)
            print(game_board)
        
if WINNER:
    declare_winner()
print("***THANK YOU***")
