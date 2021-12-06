.PHONY: run

TARGET=cw.tex

run: cw.tex
	lualatex -shell-escape $(TARGET)
	lualatex -shell-escape $(TARGET)

view:
	evince $(TARGET)
