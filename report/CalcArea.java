import java.util.Scanner;

// 抽象父类：几何图形
abstract class GeometricFigure {
    protected String figureType;
    protected double area;
    
    public abstract double CalculatingArea();
    public abstract void printarea();
}

// 圆形类
class Circle extends GeometricFigure {
    private double radius;
    public Circle() {
        this.figureType = "Circle";
    }
    
    @Override
    public double CalculatingArea() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入圆的半径: ");
        radius = scanner.nextDouble();
        area = Math.PI * radius * radius;
        return area;
    }
    
    @Override
    public void printarea() {
        System.out.printf("圆的面积是: %.2f\n", area);
    }
}

// 三角形类
class Triangle extends GeometricFigure {
    private double a, b, c;
    
    public Triangle() {
        this.figureType = "Triangle";
    }
    
    @Override
    public double CalculatingArea() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入三角形的三条边 (用空格分隔): ");
        a = scanner.nextDouble();
        b = scanner.nextDouble();
        c = scanner.nextDouble();
        
        // 判断是否能构成三角形
        if (a + b <= c || a + c <= b || b + c <= a) {
            area = -1;
            return -1;
        }
        
        // 使用海伦公式计算面积
        double p = (a + b + c) / 2;
        area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        return area;
    }
    
    @Override
    public void printarea() {
        if (area == -1) {
            System.out.println("不能构成三角形，不能进行面积计算");
        } else {
            System.out.printf("三角形的面积是: %.2f\n", area);
        }
    }
}

// 主类
public class CalcArea {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        GeometricFigure figure = null;
        boolean validInput = false;

        while (!validInput) {
            System.out.println("请选择要计算的图形 (1:圆形 2:三角形):");
            try {
                int choice = scanner.nextInt();
                switch (choice) {
                    case 1:
                        figure = new Circle();
                        validInput = true;
                        break;
                    case 2:
                        figure = new Triangle();
                        validInput = true;
                        break;
                    default:
                        System.out.println("无效的选择！请输入数字1或2");
                        break;
                }
            } catch (Exception e) {
                System.out.println("输入无效！请输入数字1或2");
                scanner.nextLine(); // 清除输入缓冲
            }
        }
        
        figure.CalculatingArea();
        figure.printarea();
    }
}