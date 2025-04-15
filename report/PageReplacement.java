import java.util.*;

public class PageReplacement {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // 输入物理块数
        System.out.print("请输入物理块数量: ");
        int frameCount = scanner.nextInt();
        // 输入页面序列
        System.out.print("请输入页面序列(用空格分隔): ");
        scanner.nextLine(); // 清除换行符
        String[] pagesStr = scanner.nextLine().split(" ");
        // 转换为int数组
        int[] pageSequence = new int[pagesStr.length];
        for (int i = 0; i < pagesStr.length; i++) {
            pageSequence[i] = Integer.parseInt(pagesStr[i]);
        }
        // 执行FIFO算法
        System.out.println("\n=== FIFO页面置换算法 ===");
        simulateFIFO(frameCount, pageSequence);
        // 执行LRU算法
        System.out.println("\n=== LRU页面置换算法 ===");
        simulateLRU(frameCount, pageSequence);
        scanner.close();
    }

    // FIFO算法实现
    private static void simulateFIFO(int frameCount, int[] pages) {
        Queue<Integer> frames = new LinkedList<>();
        int pageFaults = 0;
        System.out.println("访问顺序:");
        for (int i = 0; i < pages.length; i++) {
            System.out.printf("访问页面 %d: ", pages[i]);
            if (!frames.contains(pages[i])) {
                pageFaults++;
                if (frames.size() >= frameCount) {
                    frames.poll(); // 移除最先进入的页面
                }
                frames.offer(pages[i]);
            }
            // 打印当前内存状态
            System.out.println(frames);
        }
        // 计算并打印缺页率
        double faultRate = (double) pageFaults / pages.length * 100;
        System.out.printf("缺页次数: %d\n", pageFaults);
        System.out.printf("缺页率: %.2f%%\n", faultRate);
    }

    // LRU算法实现
    private static void simulateLRU(int frameCount, int[] pages) {
        LinkedHashSet<Integer> frames = new LinkedHashSet<>();
        int pageFaults = 0;
        System.out.println("访问顺序:");
        for (int i = 0; i < pages.length; i++) {
            System.out.printf("访问页面 %d: ", pages[i]);
            if (frames.contains(pages[i])) {
                // 如果页面已存在，将其移到最新使用位置
                frames.remove(pages[i]);
                frames.add(pages[i]);
            } else {
                pageFaults++;
                if (frames.size() >= frameCount) {
                    // 移除最久未使用的页面（第一个元素）
                    Iterator<Integer> iterator = frames.iterator();
                    iterator.next();
                    iterator.remove();
                }
                frames.add(pages[i]);
            }
            // 打印当前内存状态
            System.out.println(frames);
        }
        // 计算并打印缺页率
        double faultRate = (double) pageFaults / pages.length * 100;
        System.out.printf("缺页次数: %d\n", pageFaults);
        System.out.printf("缺页率: %.2f%%\n", faultRate);
    }
}