from tkinter import Tk, Canvas, mainloop


def circle(canvas, x, y, r, width):
    id = canvas.create_oval(x-r, y-r, x+r, y+r, width=width)
    return id


def line(canvas, x1, y1, x2, y2, width):
    canvas.create_line(x1, y1, x2, y2, width=width)


def text(canvas, x, y, text):
    canvas.create_text(x, y, text=text, font=("bold", 20))


w = Canvas(Tk(), width=1000, height=600, bg="white")

circle(w, 150, 300, 70, 3)
circle(w, 150, 300, 50, 3)
circle(w, 370, 300, 70, 3)
circle(w, 640, 300, 70, 3)
circle(w, 910, 300, 70, 3)

line(w, 10, 300, 80, 300, 3)
circle(w, 73, 300, 5, 6)
line(w, 220, 300, 300, 300, 3)
circle(w, 293, 300, 5, 6)
line(w, 440, 300, 570, 300, 3)
circle(w, 567, 300, 5, 6)
line(w, 710, 300, 840, 300, 3)
circle(w, 837, 300, 5, 6)

text(w, 150, 300, "q0")
text(w, 370, 300, "q1")
text(w, 640, 300, "q2")
text(w, 910, 300, "q3")

w.pack()
mainloop()
