#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

class FIFO {
    vector<int> mem;
    int size;
    int faults;
public:
    FIFO(int n) {
        size = n;
        faults = 0;
    }

    void run(int page) {
        cout << "\n访问: " << page << endl;
        // 检查是否已在内存中
        for(int i = 0; i < mem.size(); i++) {
            if(mem[i] == page) {
                print();
                return;
            }
        }
        faults++;
        // 内存未满，直接添加
        if(mem.size() < size) {
            mem.push_back(page);
        }
        // 内存已满，替换最早的页面
        else {
            for(int i = 0; i < size-1; i++) {
                mem[i] = mem[i+1];
            }
            mem[size-1] = page;
        }
        cout << "缺页!" << endl;
        print();
    }
    
    void print() {
        cout << "内存: ";
        for(int i = 0; i < mem.size(); i++) {
            cout << mem[i] << " ";
        }
        cout << endl;
    }
    
    int getFaults() {
        return faults;
    }
};

int main() {
    int n;
    cout << "输入物理块数: ";
    cin >> n;
    // 检查输入是否为正整数
    if(n <= 0) {
        cout << "物理块数必须为正整数!" << endl;
        return 1;
    }

    FIFO fifo(n);
    string line;
    cout << "输入页面序列(回车结束):\n";
    cin.ignore();
    getline(cin, line);
    istringstream iss(line);
    int page;
    while(iss >> page) {
        fifo.run(page);
    }

    cout << "\n总缺页数: " << fifo.getFaults() << endl;
    return 0;
}