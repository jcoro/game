describe('checkValidMove(a, b)', function(){
    var testGrid = null;
    beforeEach(function(){
        testGrid =
            [
                [0,0], [0,1], [0,2],
                [1,0], [1,1], [1,2]
            ];
    });

    it('checks if a move in the grid is valid', function(){

        var validTestMoves = [ [0,0], [0,1], [0,2], [1,0], [1,1], [1,2] ];
        var move;
        validTestMoves.forEach(function(mv){
            move = GAME.checkValidMove(mv, testGrid);
            expect(move).toBe(true);
        })
    });

    it('checks if a move outside the grid is valid', function() {
        var invalidTestMoves = [[2, 0], [2, 1], [2, 2], [3, 0], [3, 1], [3, 2]];
        var move;
        invalidTestMoves.forEach(function (mv) {
            move = GAME.checkValidMove(mv, testGrid);
            expect(move).toBe(false);
        })
    });
});

describe('getRoom(player)', function(){

    var testPlayer = null;

    beforeEach(function(){
        testPlayer = new Player();
    });

    it('checks if the default player location returns Hallway', function() {
        expect(GAME.getRoom(testPlayer)).toBe("Hallway");
    });
    it('checks if upper center coordinates returns Hallway', function() {
        testPlayer.coordinates = [269, 43];
        expect(GAME.getRoom(testPlayer)).toBe("Hallway");
    });
    it('checks if coordinates return Room 1', function() {
        testPlayer.coordinates = [68, 194];
        expect(GAME.getRoom(testPlayer)).toBe("Room 1");
    });
    it('checks if coordinates return Room 2', function() {
        testPlayer.coordinates = [470, 194];
        expect(GAME.getRoom(testPlayer)).toBe("Room 2");
    });
    it('checks if coordinates return Room 3', function() {
        testPlayer.coordinates = [68, 43];
        expect(GAME.getRoom(testPlayer)).toBe("Room 3");
    });
    it('checks if coordinates return Room 4', function() {
        testPlayer.coordinates = [470, 43];
        expect(GAME.getRoom(testPlayer)).toBe("Room 4");
    });


});

describe("displayRoomData(coords)", function(){

    var testPlayer = null;

    beforeEach(function(){
        testPlayer = new Player();
    });

   it("checks if the correct room is returned", function(){
       testPlayer.coordinates = [68,194];

   })
});