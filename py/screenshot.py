import Cocoa
import Quartz
import os
from PyObjCTools import AppHelper
from Foundation import NSObject
import time

class ScreenshotTaker(NSObject):
    def take_screenshot_(self, sender):
        # 获取主屏幕
        main_screen = Cocoa.NSScreen.mainScreen()
        screen_rect = main_screen.frame()

        # 创建半透明的覆盖窗口
        overlay_window = Cocoa.NSWindow.alloc().initWithContentRect_styleMask_backing_defer_(
            screen_rect,
            Cocoa.NSBorderlessWindowMask,
            Cocoa.NSBackingStoreBuffered,
            False
        )
        overlay_window.setLevel_(Cocoa.NSScreenSaverWindowLevel)
        overlay_window.setAlphaValue_(0.5)
        overlay_window.makeKeyAndOrderFront_(None)

        # 等待用户选择区域
        mouse_down_event = Cocoa.NSApp.nextEventMatchingMask_untilDate_inMode_dequeue_(
            Cocoa.NSLeftMouseDownMask,
            Cocoa.NSDate.distantFuture(),
            Cocoa.NSEventTrackingRunLoopMode,
            True
        )

        start_point = mouse_down_event.locationInWindow()

        mouse_up_event = Cocoa.NSApp.nextEventMatchingMask_untilDate_inMode_dequeue_(
            Cocoa.NSLeftMouseUpMask,
            Cocoa.NSDate.distantFuture(),
            Cocoa.NSEventTrackingRunLoopMode,
            True
        )

        end_point = mouse_up_event.locationInWindow()

        # 移除覆盖窗口
        overlay_window.close()

        # 计算截图区域
        x = min(start_point.x, end_point.x)
        y = screen_rect.size.height - max(start_point.y, end_point.y)
        width = abs(end_point.x - start_point.x)
        height = abs(end_point.y - start_point.y)

        # 捕获屏幕截图
        screenshot = Quartz.CGWindowListCreateImage(
            Quartz.CGRectMake(x, y, width, height),
            Quartz.kCGWindowListOptionOnScreenOnly,
            Quartz.kCGNullWindowID,
            Quartz.kCGWindowImageDefault
        )

        # 保存截图
        desktop_path = os.path.expanduser("~/Desktop")
        timestamp = time.strftime("%Y%m%d-%H%M%S")
        filename = f"screenshot_{timestamp}.png"
        filepath = os.path.join(desktop_path, filename)

        destination = Quartz.CGImageDestinationCreateWithURL(
            Cocoa.NSURL.fileURLWithPath_(filepath),
            "public.png",
            1,
            None
        )

        Quartz.CGImageDestinationAddImage(destination, screenshot, None)
        Quartz.CGImageDestinationFinalize(destination)

        print(f"Screenshot saved to: {filepath}")

def main():
    app = Cocoa.NSApplication.sharedApplication()

    # 创建菜单栏项
    menubar = Cocoa.NSMenu.alloc().init()
    app_menu_item = Cocoa.NSMenuItem.alloc().init()
    menubar.addItem_(app_menu_item)
    app.setMainMenu_(menubar)

    app_menu = Cocoa.NSMenu.alloc().init()
    quit_menu_item = Cocoa.NSMenuItem.alloc().initWithTitle_action_keyEquivalent_(
        "Quit", "terminate:", "q"
    )
    app_menu.addItem_(quit_menu_item)
    app_menu_item.setSubmenu_(app_menu)

    # 创建截图对象和快捷键
    screenshot_taker = ScreenshotTaker.alloc().init()
    Cocoa.NSEvent.addGlobalMonitorForEventsMatchingMask_handler_(
        Cocoa.NSKeyDownMask,
        lambda event: screenshot_taker.take_screenshot_(None) if event.keyCode() == 0x31 and event.modifierFlags() & Cocoa.NSCommandKeyMask and event.modifierFlags() & Cocoa.NSShiftKeyMask else None
    )

    AppHelper.runEventLoop()

if __name__ == "__main__":
    main()