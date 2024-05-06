-- SQLite
DELETE FROM auth_user WHERE id!=17;

UPDATE auth_user SET id=1 WHERE id=17;

DELETE FROM trading_tool_stocktable;