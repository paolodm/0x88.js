module('Chessboard');

var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 2';

test('Correctly imports FEN string and populates board', function() {
    var board = new Board(fen)
      , invalid_fen = '8/8/8/8/8/8 b - - 0 60';

    equal(board.positions[0], board.pieces['R']);
    equal(board.positions[0x77], board.pieces['r']);
    equal(board.turn, board.WHITE);
    equal(board.half_moves, 0);
    equal(board.full_moves, 2);

    // raises(board.from_fen(invalid_fen),
    //        'Invalid fen file must throw an exception');
});

test('Test Board::fen_get_castling', function() {
    var board = new Board(fen);

    equal(board.fen_get_castling(), 'KQkq');
});

test('Correctly exports FEN string', function() {
    var board = new Board(fen)

    equal(board.to_fen(), fen);
});

test('Test Board::reset', function() {
    var board = new Board(fen)
    board.reset();

    equal(board.turn, board.WHITE);
    equal(board.castling, 0x0F);
    equal(board.en_passant, null);
    equal(board.half_moves, 0);
    equal(board.full_moves, 0);
});

test('Test Board::position_piece', function() {
    var board = new Board()
      , piece = board.pieces['p']
      , index = 0x60;

    board.position_piece(piece, index); // Move leftmost black pawn forwards
    equal(board.positions[index], piece);
});

test('Test Board::get_index', function() {
    var board = new Board();

    equal(board.get_index(2, 4), 0x24); // e3
    equal(board.get_index('g7'), 0x66); // h8
});

test('Test Board::has_index', function() {
    var board = new Board();

    equal(board.has_index(0x00), true); // a1
    equal(board.has_index(0x77), true); // h8
    equal(board.has_index(0x88), false); // invalid
});

test('Test Board::get_algebraic_notation', function() {
    var board = new Board();

    equal(board.get_algebraic_notation(0x11), 'b2');
    equal(board.get_algebraic_notation(0x77), 'h8');
});


test('Test Board::get_color', function() {
    var board = new Board();

    equal(board.get_color(0x20), board.BLACK); // Black queen
    equal(board.get_color(0x81), board.WHITE); // White pawn
});

test('Test Board::get_piece', function() {
    var board = new Board();

    equal(board.get_piece(0x20), 'q'); // Black queen
});

