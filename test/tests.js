describe('checkValidMove(a, b)', function(){
    var testGrid = null;

    beforeEach(function(){
        testGrid =
            [
                [0,0], [0,1], [0,2],
                [1,0], [1,1], [1,2],
                [2,0], [2,1], [2,2]
            ];
    });

    it('checks if a move in the grid is valid', function(){
        var testMove = [1,1];
        var move = GAME.checkValidMove(testMove, testGrid);
        expect(move).toBe(true);

    });

    it('checks if a move outside the grid is valid', function(){
        var testMove = [3,1];
        var move = GAME.checkValidMove(testMove, testGrid);
        expect(move).toBe(false);
    });
});

describe('getRoom(player)', function(){

    var testPlayer = null;

    beforeEach(function(){
        testPlayer = new Player();
    })

    it('checks if the default player location ([2,1]) returns Hallway', function() {
        var location = GAME.getRoom(testPlayer);
        expect(location).toBe("Hallway");
    });
    it('checks if a location array with second number equal to 0 returns Left Room', function() {
        testPlayer.location = [0, 0];
        var location2 = GAME.getRoom(testPlayer);
        expect(location2).toBe("Left Room");
    });
    it('checks if a location array with second number equal to 2 returns Left Room', function() {
        testPlayer.location = [0,2];
        var location3 = GAME.getRoom(testPlayer);
        expect(location3).toBe("Right Room");
    });

});