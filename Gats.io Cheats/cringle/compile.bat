@echo off
echo Compiling...
java -jar closure-compiler.jar input.js > output.js --rewrite_polyfills=false
echo Compiled.