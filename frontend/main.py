import tkinter as tk
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app


def center_window(window, width, height):
    window.update_idletasks()
    screen_w = window.winfo_screenwidth()
    screen_h = window.winfo_screenheight()
    centered_x = int((screen_w - width) / 2)
    centered_y = int((screen_h - height) / 2)
    window.geometry(f"{width}x{height}+{centered_x}+{centered_y}")

def main():
    mainWindow = tk.Tk()
    mainWindow.title("Hello World")
    mainWindow.configure(bg="#2b2b2b")  # Set background color
    
    mainWindow.geometry("1000x600")
    center_window(mainWindow, 1000, 600)


    label = tk.Label(mainWindow, text="Hello, world!", font=("Segoe UI", 16))
    label.pack(padx=20, pady=10)

    def on_click():
        # prints to the console
        print("Hello, world!")
        # updates the label text
        label.config(text="Hello, world!")

    btn = tk.Button(mainWindow, text="Say Hello", command=on_click)
    btn.pack(pady=(0, 20))

    mainWindow.mainloop()




if __name__ == "__main__":
    main()