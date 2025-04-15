#include <iostream>

// 定义二叉树节点结构
struct TreeNode
{
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// 自定义队列节点
struct QueueNode
{
    TreeNode *data;
    QueueNode *next;
    QueueNode(TreeNode *x) : data(x), next(NULL) {}
};

// 自定义队列类
class Queue
{
private:
    QueueNode *front, *rear;

public:
    Queue()
    {
        front = rear = NULL;
    }

    // 入队
    void push(TreeNode *x)
    {
        QueueNode *temp = new QueueNode(x);
        if (rear == NULL)
        {
            front = rear = temp;
            return;
        }
        rear->next = temp;
        rear = temp;
    }

    // 出队
    TreeNode *pop()
    {
        if (front == NULL)
            return NULL;

        QueueNode *temp = front;
        TreeNode *result = front->data;
        front = front->next;

        if (front == NULL)
            rear = NULL;

        delete temp;
        return result;
    }

    // 判断队列是否为空
    bool empty()
    {
        return front == NULL;
    }

    // 析构函数
    ~Queue()
    {
        while (front != NULL)
        {
            QueueNode *temp = front;
            front = front->next;
            delete temp;
        }
    }
};

// 插入节点到BST
TreeNode *insert(TreeNode *root, int value)
{
    if (root == NULL)
    {
        return new TreeNode(value);
    }

    if (value < root->val)
    {
        root->left = insert(root->left, value);
    }
    else
    {
        root->right = insert(root->right, value);
    }
    return root;
}

// 中序遍历
void inOrder(TreeNode *root)
{
    if (root == NULL)
        return;

    inOrder(root->left);
    std::cout << root->val << " ";
    inOrder(root->right);
}

// 层次遍历（使用自定义队列）
void levelOrder(TreeNode *root)
{
    if (root == NULL)
        return;

    Queue q;
    q.push(root);

    while (!q.empty())
    {
        TreeNode *current = q.pop();
        std::cout << current->val << " ";

        if (current->left)
            q.push(current->left);
        if (current->right)
            q.push(current->right);
    }
}

// 清理树内存
void deleteTree(TreeNode *root)
{
    if (root == NULL)
        return;
    deleteTree(root->left);
    deleteTree(root->right);
    delete root;
}

int main()
{
    TreeNode *root = NULL;
    int num;

    std::cout << "请输入10个1-100的整数：" << std::endl;

    // 输入10个数并构建BST
    for (int i = 0; i < 10; i++)
    {
        // 检查输入是否成功
        if (!(std::cin >> num))
        {
            std::cin.clear();             // 清除错误标志
            std::cin.ignore(10000, '\n'); // 忽略当前行剩余输入
            std::cout << "输入无效，请输入数字！" << std::endl;
            i--;
            continue;
        }

        // 检查数值范围
        if (num < 1 || num > 100)
        {
            std::cout << "输入无效，请输入1-100之间的整数！" << std::endl;
            i--;
            continue;
        }

        root = insert(root, num);
    }

    std::cout << "中序遍历结果：";
    inOrder(root);
    std::cout << std::endl;

    std::cout << "层次遍历结果：";
    levelOrder(root);
    std::cout << std::endl;

    // 清理内存
    deleteTree(root);

    return 0;
}