#include <iostream>

struct TreeNode
{
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

struct QueueNode
{
    TreeNode *data;
    QueueNode *next;
    QueueNode(TreeNode *x) : data(x), next(NULL) {}
};

class Queue
{
private:
    QueueNode *front, *rear;

public:
    Queue()
    {
        front = rear = NULL;
    }

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

    bool empty()
    {
        return front == NULL;
    }

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

void inOrder(TreeNode *root)
{
    if (root == NULL)
        return;

    inOrder(root->left);
    std::cout << root->val << " ";
    inOrder(root->right);
}

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

    for (int i = 0; i < 10; i++)
    {
        if (!(std::cin >> num))
        {
            std::cin.clear();             // 清除错误标志
            std::cin.ignore(10000, '\n'); // 忽略当前行剩余输入
            std::cout << "输入无效，请输入数字！" << std::endl;
            i--;
            continue;
        }

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

    deleteTree(root);

    return 0;
}